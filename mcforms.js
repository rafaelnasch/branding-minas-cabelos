/* =====================================================================
   MCFORMS · motor de formas da Minas Cabelos · sistema Cartela Mineira v1
   A ilustração da casa sai do próprio cabelo e da marca: a MECHA (a onda
   dourada do logotipo), a CARTELA (as cinco faixas de tom), o FIO, a ONDA,
   o CACHO, a TRANÇA, a RÉGUA de comprimento e as TEXTURAS. SVG puro, zero
   dependências, determinístico (sem Math.random, sem Date).

   COMO USAR
     Declarativa:  <div class="forma-svg" data-mcforms="mecha"></div>
                   <div class="forma-svg" data-mcforms='{"forma":"regua","de":30,"ate":80,"destaque":60}'></div>
     Por chamada:  mcforms.render(el, 'cacho', { voltas: 3 })
     Texto SVG:    mcforms.svg('mecha', { campo: 'cafe' })   (para colar no Canva ou no Figma)

   AS CORES SAEM DO CAMPO
     Sem opção, lê --f-destaque (ouro no Café, vinho no claro), --f-linha, --f-apoio,
     --f-titulo-c e --f-fundo do lugar onde a forma está. Com {campo:'cafe'|'leite'|
     'creme'|'painel'|'torra'|'branco'|'vinho'} usa a paleta fixa. Toda cor sai em HEX.

   FORMAS
     mecha    { fios: 2, largura: 1 }           a onda do logotipo: divisor, sublinhado, assinatura
     cartela  { direcao: 'v'|'h', nomes: false } as cinco faixas de tom (Mel, Dourado, Mata, Cobre, Vinho)
     fios     { n: 9, curva: 1 }                textura de fios paralelos (campo Café)
     onda     { n: 5 }                          ondas horizontais (o ondulado)
     cacho    { voltas: 5, n: 3 }               espirais (o cacheado e o crespo)
     tranca   { gomos: 6 }                      a trança (jumbo, box braids)
     regua    { de: 30, ate: 80, passo: 10, destaque: 60, unidade: 'cm' }  a régua de comprimento
     texturas { tipos: ['liso','ondulado','cacheado','crespo'], destaque: -1 }  as quatro curvaturas
     moldura  { proporcao: 0.8 }                janela da foto com a cartela na borda

   REGRAS DA CASA EMBUTIDAS
     Uma forma por peça, ao lado do texto, nunca atrás dele (exceto fios e onda, que são
     textura de campo Café com opacidade baixa). O ouro marca uma coisa só. Nada de tesoura,
     secador, pente, silhueta de mulher genérica ou coroa: são clichês do setor.
   ===================================================================== */
const mcforms = (() => {
  'use strict';
  const temDoc = typeof document !== 'undefined';
  let seq = 0;
  const PALETAS = {
    cafe:   { destaque: '#F0B800', linha: '#4A3122', apoio: '#C9A98A', titulo: '#FFFFFF', fundo: '#28170C' },
    painel: { destaque: '#F0B800', linha: '#5A3D2A', apoio: '#C9A98A', titulo: '#FFFFFF', fundo: '#3A2316' },
    torra:  { destaque: '#F0B800', linha: '#3A2618', apoio: '#C9A98A', titulo: '#FFFFFF', fundo: '#1B0F07' },
    vinho:  { destaque: '#F0B800', linha: '#A1352B', apoio: '#F1E4D1', titulo: '#FFFFFF', fundo: '#80170F' },
    leite:  { destaque: '#80170F', linha: '#E6D5BC', apoio: '#6B4A36', titulo: '#33150A', fundo: '#FBF6EE' },
    creme:  { destaque: '#80170F', linha: '#D9C3A4', apoio: '#6B4A36', titulo: '#33150A', fundo: '#F1E4D1' },
    branco: { destaque: '#80170F', linha: '#E6D5BC', apoio: '#6B4A36', titulo: '#33150A', fundo: '#FFFFFF' }
  };
  const TONS = [['Mel', '#DD9A37'], ['Dourado', '#E9B43E'], ['Mata', '#8B9D30'], ['Cobre', '#E85529'], ['Vinho', '#80170F']];
  const VARS = { destaque: '--f-destaque', linha: '--f-linha', apoio: '--f-apoio', titulo: '--f-titulo-c', fundo: '--f-fundo' };

  function hex(v) {
    v = String(v || '').trim(); let m;
    if (/^#[0-9a-f]{3}$/i.test(v)) return ('#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3]).toUpperCase();
    if (/^#[0-9a-f]{6}$/i.test(v)) return v.toUpperCase();
    m = v.match(/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
    if (m) return '#' + [m[1], m[2], m[3]].map(n => ('0' + Math.round(+n).toString(16)).slice(-2)).join('').toUpperCase();
    return null;
  }
  function cores(el, o) {
    if (o && o.campo && PALETAS[o.campo]) return Object.assign({}, PALETAS[o.campo]);
    const c = Object.assign({}, PALETAS.leite);
    if (!el || !temDoc) return c;
    try { const cs = getComputedStyle(el); Object.keys(VARS).forEach(k => { const h = hex(cs.getPropertyValue(VARS[k])); if (h) c[k] = h; }); } catch (e) { /* fica o leite */ }
    return c;
  }
  const r = n => Math.round(n * 10) / 10;
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const LAB = "font-family:'Nunito Sans',Arial,sans-serif";
  const NUM = "font-family:'Montserrat',Arial,sans-serif";

  /* fita afilada ao longo de uma cúbica: largura máxima wmax no ponto pico */
  function bez(p, t) {
    const m = 1 - t;
    return [m * m * m * p[0][0] + 3 * m * m * t * p[1][0] + 3 * m * t * t * p[2][0] + t * t * t * p[3][0],
            m * m * m * p[0][1] + 3 * m * m * t * p[1][1] + 3 * m * t * t * p[2][1] + t * t * t * p[3][1]];
  }
  function fita(p, wmax, pico, t0, t1, wmin) {
    pico = pico == null ? 0.45 : pico; t0 = t0 || 0; t1 = t1 == null ? 1 : t1; wmin = wmin == null ? 0.8 : wmin;
    const n = 64, pts = [];
    for (let i = 0; i <= n; i++) pts.push(bez(p, t0 + (t1 - t0) * i / n));
    const L = [], R = [];
    pts.forEach((pt, i) => {
      const a = pts[Math.max(i - 1, 0)], b = pts[Math.min(i + 1, n)];
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, u = i / n;
      const w = wmin + (wmax - wmin) * (u <= pico ? Math.pow(Math.sin(Math.PI * Math.min(u / pico, 1) / 2), 1.6) : Math.pow(Math.cos(Math.PI * (u - pico) / (1 - pico) / 2), 1.2));
      L.push([pt[0] + nx * w / 2, pt[1] + ny * w / 2]); R.push([pt[0] - nx * w / 2, pt[1] - ny * w / 2]);
    });
    return 'M' + L.concat(R.reverse()).map(q => r(q[0]) + ' ' + r(q[1])).join('L') + 'Z';
  }

  const FORMAS = {
    mecha(c, o) {
      const W = 600, H = 120, k = o.largura || 1;
      const C1 = [[8, 104], [190, 56], [420, 92], [592, 14]];
      const C2 = [[150, 78], [300, 44], [460, 64], [592, 10]];
      let s = `<path d="${fita(C1, 26 * k, 0.42, 0, 1, 1)}" fill="${c.destaque}"/>`;
      if ((o.fios || 2) > 1) s += `<path d="${fita(C2, 6 * k, 0.55, 0.32, 1, 0.5)}" fill="${c.destaque}"/>`;
      return { W, H, s };
    },
    cartela(c, o) {
      const v = (o.direcao || 'v') !== 'h', nomes = !!o.nomes;
      const W = v ? (nomes ? 300 : 60) : 600, H = v ? 500 : (nomes ? 130 : 60);
      let s = '';
      TONS.forEach((t, i) => {
        if (v) {
          s += `<rect x="0" y="${i * 100}" width="60" height="100.5" fill="${t[1]}"/>`;
          if (nomes) s += `<text x="80" y="${i * 100 + 56}" style="${NUM};font-weight:800;font-size:22px" fill="${c.titulo}">${t[0]}</text><text x="80" y="${i * 100 + 80}" style="${LAB};font-size:14px" fill="${c.apoio}">${t[1]}</text>`;
        } else {
          s += `<rect x="${i * 120}" y="0" width="120.5" height="60" fill="${t[1]}"/>`;
          if (nomes) s += `<text x="${i * 120 + 6}" y="92" style="${NUM};font-weight:800;font-size:18px" fill="${c.titulo}">${t[0]}</text><text x="${i * 120 + 6}" y="114" style="${LAB};font-size:13px" fill="${c.apoio}">${t[1]}</text>`;
        }
      });
      return { W, H, s };
    },
    fios(c, o) {
      const W = 600, H = 400, n = o.n || 9, k = o.curva == null ? 1 : o.curva;
      let s = '';
      for (let i = 0; i < n; i++) {
        const x = 40 + i * (520 / Math.max(1, n - 1)), d = (i % 3 - 1) * 18 * k;
        const cor = i === Math.floor(n / 2) ? c.destaque : c.linha, w = i === Math.floor(n / 2) ? 3 : 1.6;
        s += `<path d="M${r(x)} -10 C ${r(x + 60 * k + d)} 110, ${r(x - 70 * k - d)} 250, ${r(x + 20 * k)} 410" fill="none" stroke="${cor}" stroke-width="${w}" stroke-linecap="round"/>`;
      }
      return { W, H, s };
    },
    onda(c, o) {
      const W = 600, H = 300, n = o.n || 5;
      let s = '';
      for (let i = 0; i < n; i++) {
        const y = 40 + i * (220 / Math.max(1, n - 1)), cor = i === Math.floor(n / 2) ? c.destaque : c.linha, w = i === Math.floor(n / 2) ? 3 : 1.6;
        let d = `M -10 ${r(y)}`;
        for (let x = -10; x < 620; x += 120) d += ` q 30 -26 60 0 t 60 0`;
        s += `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${w}" stroke-linecap="round"/>`;
      }
      return { W, H, s };
    },
    cacho(c, o) {
      const n = o.n || 3, voltas = o.voltas || 5, W = 200 * n, H = 360;
      let s = '';
      for (let j = 0; j < n; j++) {
        const cx = 100 + j * 200, pts = [], passos = voltas * 40;
        for (let i = 0; i <= passos; i++) {
          const t = i / passos, a = t * voltas * Math.PI * 2, rr = 44 - t * 10;
          pts.push([cx + Math.cos(a) * rr, 50 + t * 260 + Math.sin(a) * rr * 0.9]);
        }
        const cor = j === Math.floor(n / 2) ? c.destaque : c.apoio;
        s += `<path d="M${pts.map(q => r(q[0]) + ' ' + r(q[1])).join('L')}" fill="none" stroke="${cor}" stroke-width="${j === Math.floor(n / 2) ? 4 : 2.4}" stroke-linecap="round" stroke-linejoin="round"/>`;
      }
      return { W, H, s };
    },
    tranca(c, o) {
      const g = o.gomos || 6, W = 220, H = 60 + g * 70;
      let s = '';
      for (let i = 0; i < g; i++) {
        const y = 30 + i * 70, esq = i % 2 === 0;
        const d = esq ? `M 60 ${y} C 60 ${y + 40}, 150 ${y + 30}, 160 ${y + 70} C 130 ${y + 74}, 70 ${y + 60}, 60 ${y}Z`
                      : `M 160 ${y} C 160 ${y + 40}, 70 ${y + 30}, 60 ${y + 70} C 90 ${y + 74}, 150 ${y + 60}, 160 ${y}Z`;
        s += `<path d="${d}" fill="none" stroke="${i === Math.floor(g / 2) ? c.destaque : c.apoio}" stroke-width="${i === Math.floor(g / 2) ? 4 : 2.4}" stroke-linejoin="round"/>`;
      }
      s += `<path d="M 110 ${30 + g * 70} L 110 ${H - 4}" stroke="${c.apoio}" stroke-width="2.4" stroke-linecap="round"/>`;
      return { W, H, s };
    },
    regua(c, o) {
      const de = o.de == null ? 30 : o.de, ate = o.ate == null ? 80 : o.ate, passo = o.passo || 10, un = o.unidade || 'cm', hi = o.destaque;
      const W = 640, H = 130, x0 = 30, x1 = 610, esc_ = (x1 - x0) / (ate - de);
      let s = `<line x1="${x0}" y1="40" x2="${x1}" y2="40" stroke="${c.apoio}" stroke-width="2"/>`;
      for (let v = de; v <= ate + 0.001; v += passo / 2) {
        const x = x0 + (v - de) * esc_, inteiro = Math.abs((v - de) % passo) < 0.001;
        s += `<line x1="${r(x)}" y1="40" x2="${r(x)}" y2="${inteiro ? 62 : 52}" stroke="${c.apoio}" stroke-width="${inteiro ? 2 : 1.2}"/>`;
        if (inteiro) s += `<text x="${r(x)}" y="90" text-anchor="middle" style="${LAB};font-weight:700;font-size:16px" fill="${v === hi ? c.titulo : c.apoio}">${v}</text>`;
      }
      if (hi != null) {
        const x = x0 + (hi - de) * esc_;
        s += `<path d="M${r(x0)} 40 L ${r(x)} 40" stroke="${c.destaque}" stroke-width="6" stroke-linecap="round"/><path d="M${r(x)} 26 l 9 14 l -9 14 l -9 -14 Z" fill="${c.destaque}"/>`;
        s += `<text x="${r(x)}" y="18" text-anchor="middle" style="${NUM};font-weight:800;font-size:18px" fill="${c.titulo}">${esc(hi + ' ' + un)}</text>`;
      }
      s += `<text x="${x1}" y="118" text-anchor="end" style="${NUM};font-weight:700;font-size:11px;letter-spacing:2px" fill="${c.apoio}">${esc(un.toUpperCase())}</text>`;
      return { W, H, s };
    },
    texturas(c, o) {
      const tipos = o.tipos || ['liso', 'ondulado', 'cacheado', 'crespo'], hi = o.destaque == null ? -1 : o.destaque;
      const W = tipos.length * 150, H = 300;
      let s = '';
      tipos.forEach((t, j) => {
        const cx = 75 + j * 150, cor = j === hi ? c.destaque : c.apoio, sw = j === hi ? 3.2 : 2.2;
        for (let f = -1; f <= 1; f++) {
          const x = cx + f * 16; let d;
          if (t === 'liso') d = `M${x} 20 L ${x} 230`;
          else if (t === 'ondulado') d = `M${x} 20 C ${x + 22} 70, ${x - 22} 120, ${x} 160 S ${x + 18} 220, ${x} 236`;
          else {
            const pts = [], k = t === 'crespo' ? 16 : 9, amp = t === 'crespo' ? 7 : 11, n = 160;
            for (let i = 0; i <= n; i++) { const u = i / n, a = u * k * Math.PI * 2; pts.push([x + Math.cos(a) * amp, 20 + u * 216 + Math.sin(a) * amp * 0.5]); }
            d = 'M' + pts.map(q => r(q[0]) + ' ' + r(q[1])).join('L');
          }
          s += `<path d="${d}" fill="none" stroke="${cor}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
        }
        s += `<text x="${cx}" y="276" text-anchor="middle" style="${LAB};font-weight:700;font-size:16px" fill="${j === hi ? c.titulo : c.apoio}">${esc(t.charAt(0).toUpperCase() + t.slice(1))}</text>`;
      });
      return { W, H, s };
    },
    moldura(c, o) {
      const W = 400, H = Math.round(400 / (o.proporcao || 0.8));
      let s = `<rect x="18" y="0" width="${W - 18}" height="${H}" fill="none" stroke="${c.linha}" stroke-width="2"/>`;
      TONS.forEach((t, i) => { s += `<rect x="0" y="${r(i * H / 5)}" width="12" height="${r(H / 5 + 0.5)}" fill="${t[1]}"/>`; });
      s += `<rect x="30" y="12" width="${W - 42}" height="${H - 24}" fill="${c.linha}" opacity=".35"/>`;
      return { W, H, s };
    }
  };

  function monta(nome, c, o) {
    const f = FORMAS[nome];
    if (!f) throw new Error('mcforms: forma desconhecida: ' + nome);
    const id = 'mf' + (++seq), g = f(c, o || {});
    const aria = esc((o && o.aria) || ('Forma da casa: ' + nome));
    return `<svg xmlns="http://www.w3.org/2000/svg" id="${id}" data-mcforms-forma="${nome}" viewBox="0 0 ${g.W} ${g.H}" role="img" aria-label="${aria}" focusable="false" style="width:100%;height:auto;display:block;overflow:hidden">${g.s}</svg>`;
  }
  function alvo(el) { return typeof el === 'string' ? document.getElementById(el) || document.querySelector(el) : el; }
  function render(el, nome, o) {
    el = alvo(el); if (!el) return '';
    o = o || {};
    el.innerHTML = monta(nome, cores(el, o), o);
    return el.innerHTML;
  }
  function svg(nome, o) { return monta(nome, cores(null, o || {}), o || {}); }
  function montar(raiz) {
    if (!temDoc) return;
    (raiz || document).querySelectorAll('[data-mcforms]').forEach(el => {
      const v = el.getAttribute('data-mcforms').trim();
      let cfg = { forma: v };
      if (v.charAt(0) === '{') { try { cfg = JSON.parse(v); } catch (e) { console.error('mcforms: JSON inválido', el); return; } }
      try { render(el, cfg.forma, cfg); } catch (e) { console.error(e); }
    });
  }
  if (temDoc) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => montar());
    else montar();
  }
  return { render, svg, montar, formas: Object.keys(FORMAS), tons: TONS, paletas: PALETAS, version: '1.0' };
})();
if (typeof module !== 'undefined' && module.exports) module.exports = mcforms;
