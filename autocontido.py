#!/usr/bin/env python3
"""Gera a versão AUTOCONTIDA de um HTML da skill da Minas Cabelos: um arquivo único
que abre sozinho (e-mail, WhatsApp, Drive, celular, claude.ai), sem a pasta assets/
e sem mcviz.js/mcforms.js ao lado.

O que faz:
1. cola mcviz.js e mcforms.js dentro do próprio HTML;
2. guarda cada imagem de assets/ UMA vez, em data URI, num dicionário no <head>;
3. um script troca todo src/href/srcset que começa com "assets/" pela imagem
   embutida, inclusive nos elementos que os motores criam depois;
4. url(assets/...) do CSS vira data URI direto;
5. o <link> de assets/fontes/fontes.css vira @font-face com os woff2 embutidos
   (Montserrat, Nunito Sans e Alex Brush, latin e latin-ext, SIL Open Font License),
   dentro da própria <style>: o arquivo abre com as letras certas, sem internet.
Blocos <template> e textos de código não são alterados.

Uso (só Python padrão):
  python3 autocontido.py                      # gera dist/ com os três arquivos
  python3 autocontido.py meu-material.html    # gera dist/meu-material.html
"""
import base64, json, mimetypes, os, re, sys

RAIZ = os.path.dirname(os.path.abspath(__file__))
DIST = os.path.join(RAIZ, "dist")
PADRAO = {"brand-book.html": "brand-book-minas-cabelos.html",
          "deck-template.html": "apresentacao-minas-cabelos.html",
          "lockup.html": "assinaturas-minas-cabelos.html",
          "guia-de-uso.html": "guia-de-uso-minas-cabelos.html"}
RE_ASSET = re.compile(r"assets/[A-Za-z0-9_./-]+?\.(?:png|jpe?g|svg|webp|gif)")
FONTES = os.path.join(RAIZ, "assets", "fontes")
RE_LINK_FONTES = re.compile(r'<link\b[^>]*href="assets/fontes/fontes\.css"[^>]*>\n?')


def fontes_embutidas():
    css = open(os.path.join(FONTES, "fontes.css"), encoding="utf-8").read()
    def troca(m):
        arq = os.path.join(FONTES, m.group(1))
        return "url(data:font/woff2;base64,%s)" % base64.b64encode(open(arq, "rb").read()).decode()
    return re.sub(r"url\(([^)/]+\.woff2)\)", troca, css)

TROCA = r"""<script>/* imagens embutidas: troca assets/... pela versão em data URI */
(function(){var A=window.__MINAS_ASSETS=%s;
function url(v){return A[v]||v}
function set(el){if(!el||el.nodeType!==1)return;
 ["src","href","poster","srcset"].forEach(function(a){var d=el.getAttribute("data-asset-"+a);if(d!==null){el.removeAttribute("data-asset-"+a);el.setAttribute(a,a==="srcset"?d.replace(/assets\/[^\s,]+/g,url):url(d))}});
 ["src","href","poster"].forEach(function(a){var v=el.getAttribute(a);if(v&&v.indexOf("assets/")===0&&A[v])el.setAttribute(a,A[v])});
 var x=el.getAttributeNS&&el.getAttributeNS("http://www.w3.org/1999/xlink","href");
 if(x&&x.indexOf("assets/")===0&&A[x])el.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",A[x]);
 var s=el.getAttribute("srcset");if(s&&s.indexOf("assets/")>-1)el.setAttribute("srcset",s.replace(/assets\/[^\s,]+/g,url));}
function walk(r){set(r);if(r.querySelectorAll)r.querySelectorAll("[src],[href],[srcset],image,[data-asset-src],[data-asset-srcset],[data-asset-href]").forEach(set)}
new MutationObserver(function(ms){ms.forEach(function(m){if(m.type==="attributes")set(m.target);else m.addedNodes.forEach(function(n){if(n.nodeType===1)walk(n)})})})
 .observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src","href","srcset","xlink:href"]});
document.addEventListener("DOMContentLoaded",function(){walk(document.documentElement)});})();
</script>"""


def data_uri(caminho):
    tipo = mimetypes.guess_type(caminho)[0] or "application/octet-stream"
    with open(caminho, "rb") as f:
        return "data:%s;base64,%s" % (tipo, base64.b64encode(f.read()).decode())


def autocontido(origem, destino):
    html = open(origem, encoding="utf-8").read()
    # 0. fontes locais embutidas na própria <style> (continua uma <style> só)
    if RE_LINK_FONTES.search(html):
        html = RE_LINK_FONTES.sub("", html, count=1)
        html = html.replace("<style>", "<style>\n/* Fontes embutidas (SIL Open Font License): latin e latin-ext */\n" + fontes_embutidas() + "\n", 1)
    # 1. motores dentro do arquivo
    for js in ("mcviz.js", "mcforms.js"):
        tag = '<script src="%s"></script>' % js
        if tag in html:
            codigo = open(os.path.join(RAIZ, js), encoding="utf-8").read()
            html = html.replace(tag, "<script>/* %s */\n%s\n</script>" % (js, codigo))
    # 2. dicionário de imagens (cada arquivo uma vez só)
    usados = sorted(set(m.group(0) for m in RE_ASSET.finditer(html)))
    mapa, faltando = {}, []
    for p in usados:
        c = os.path.join(RAIZ, p)
        (mapa.__setitem__(p, data_uri(c)) if os.path.isfile(c) else faltando.append(p))
    # 3. CSS url(assets/...) vira data URI direto
    html = re.sub(r"url\(\s*(['\"]?)(assets/[^)'\"]+)\1\s*\)",
                  lambda m: "url(%s)" % json.dumps(mapa.get(m.group(2), m.group(2))), html)
    # 4. atributos estáticos (fora de template, pre, script, textarea e style) viram
    #    data-asset-*: o navegador não tenta buscar o arquivo que não existe
    partes = re.split(r"(<(template|pre|script|textarea|style)\b[\s\S]*?</\2>)", html)
    saida, i = [], 0
    while i < len(partes):
        trecho = partes[i]
        if i % 3 == 0:
            # duas passadas: uma tag pode ter src e srcset ao mesmo tempo
            trecho = re.sub(r'(<(?:img|source|image|link|video)\b[^>]*?\s)(src|srcset|href|poster)="(assets/[^"]*)"',
                            lambda m: '%sdata-asset-%s="%s"' % (m.group(1), m.group(2), m.group(3)), trecho)
            trecho = re.sub(r'(<(?:img|source|image|link|video)\b[^>]*?\s)(src|srcset|href|poster)="(assets/[^"]*)"',
                            lambda m: '%sdata-asset-%s="%s"' % (m.group(1), m.group(2), m.group(3)), trecho)
            saida.append(trecho); i += 1
        else:
            saida.append(trecho); i += 2
    html = "".join(saida)
    # 5. o script de troca entra logo no começo do <head>
    bloco = TROCA % json.dumps(mapa, separators=(",", ":"))
    html = re.sub(r"(<meta charset=[^>]*>)", lambda m: m.group(1) + "\n" + bloco, html, count=1) \
        if re.search(r"<meta charset=", html) else html.replace("<head>", "<head>\n" + bloco, 1)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    open(destino, "w", encoding="utf-8").write(html)
    print("ok %s  %d KB  imagens=%d%s" % (destino, len(html.encode()) // 1024, len(mapa),
          ("  sem arquivo (ficam como estão): " + ", ".join(faltando)) if faltando else ""))


if __name__ == "__main__":
    alvos = sys.argv[1:] or list(PADRAO)
    for a in alvos:
        o = a if os.path.isabs(a) else os.path.join(RAIZ, a)
        autocontido(o, os.path.join(DIST, PADRAO.get(os.path.basename(a), os.path.basename(a))))
