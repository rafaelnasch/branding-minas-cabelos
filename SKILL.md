---
name: branding-minas-cabelos
description: "A identidade visual da Minas Cabelos (mega hair, perucas, laces e próteses capilares, Três Corações, MG) no sistema Cartela Mineira v1: Café e Creme como campos, o Ouro Minas só na marca e no destaque sobre café, a CARTELA de cinco tons (Mel, Dourado, Mata, Cobre, Vinho) na borda de toda peça, a MECHA dourada do logotipo como assinatura, Montserrat nos títulos com UMA palavra à mão em Alex Brush, Nunito Sans no texto, foto real de cabelo com cor fiel, as cinco leis da casa, a ficha de produto (material, cm, gramas, tom), as regras de anúncio e consumo (CDC, preço, troca, CONAR para embaixadoras, LGPD, políticas da Meta), gráficos (mcviz) e formas (mcforms). Use para qualquer material da Minas Cabelos: post, carrossel, story, reels, catálogo de WhatsApp, mensagem, ficha e etiqueta de produto, sacola, cartão de cuidados, site, loja virtual, vaga, embaixadora, apresentação e e-mail. Triggers: branding minas cabelos, padrão minas, minas cabelos, cartela mineira, régis minas cabelos."
---

# /branding-minas-cabelos · A identidade visual da Minas Cabelos

Um estilo de casa travado, chamado **Cartela Mineira**. Quem compra cabelo compra uma cor: antes do comprimento e da textura, a cliente quer ver o tom ao lado do próprio cabelo. A Minas já usava, no avatar e nos posts, uma faixa de cinco cores na borda, que lembra a cartela de mechas do balcão. O sistema transforma isso em regra e junta outras duas assinaturas tiradas do logotipo: **a cartela na borda, a mecha dourada uma vez, e uma palavra à mão em cada título.** O resto é sóbrio: fundo café ou creme, Montserrat firme, Nunito Sans no texto, foto real de cabelo real. Vale para **todo** material da Minas Cabelos.

Palavras-guia: acolhedora, caprichada, honesta, vaidosa, mineira. Nunca: gritada, apelativa, insegura, genérica, de liquidação.

**Abra PRIMEIRO:** [`brand-book.html`](brand-book.html), o manual vivo em 24 seções, com a marca, as fichas de cor, as escalas, os modelos de peça em tamanho real e as regras de consumo. O `<head>` e a `<style>` dele são o template portátil de **documento**. Para **apresentação**, o esqueleto pronto é [`deck-template.html`](deck-template.html). Os motores vivem em [`mcviz.js`](mcviz.js) (dados) e [`mcforms.js`](mcforms.js) (formas). Os snippets da marca, da cartela, da mecha, da identificação da loja, dos canais oficiais e da assinatura de e-mail estão em [`lockup.html`](lockup.html). Exemplos de pedidos e do que a skill entrega: [`guia-de-uso.html`](guia-de-uso.html). Quando a peça parece com esses arquivos, está certa.

---

## Onde a skill roda (e o que muda em cada lugar)

| Onde | Instalação | O que muda |
|---|---|---|
| **Claude Code** (terminal, VS Code, app de desktop) | `~/.claude/skills/branding-minas-cabelos` | Nada. Ambiente completo: escreve arquivo, usa `assets/`, exporta PDF. |
| **Codex CLI** | `~/.codex/skills/branding-minas-cabelos` | Nada. |
| **claude.ai** (navegador e celular) | Settings, Capabilities, Skills (ZIP do Releases) | **O artefato é um arquivo só: não enxerga `assets/` nem os `.js`.** |

**REGRA DO NAVEGADOR (claude.ai):** todo HTML gerado ali é **autocontido**.
1. **Marca:** use os blocos em **data URI** do [`lockup.html`](lockup.html) (blocos 02 a 06). Copie o `src` inteiro; nunca digite, resuma ou reconstrua um data URI.
2. **Fotos:** gere o data URI por código a partir do arquivo de `assets/fotos/`, sem alterar a imagem.
3. **Motores:** cole `mcviz.js` e `mcforms.js` dentro de um `<script>` do próprio arquivo.
4. **Fontes:** pelo Google Fonts: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700&family=Alex+Brush&display=swap" rel="stylesheet">`.
5. **PDF:** entregue o HTML e mande imprimir pelo Chrome (seção "Exportar PDF").

**Para ENVIAR um HTML a alguém**, use a versão autocontida: `python3 autocontido.py <arquivo.html>` grava em `dist/` com imagens, fontes e motores embutidos. As versões prontas do brand book, da apresentação, dos snippets e do guia já estão em `dist/`.

## Cores (TRAVADAS)

O sistema **não tem modo escuro automático**: a cor é da marca. `body` sempre com background explícito e `color-scheme: light`.

**Dois campos.** **Café** para o que chama atenção (capa, post de produto, story, topo do site, vaga). **Creme** e **Leite** para o que se lê com calma (miolo de carrossel, catálogo, ficha, cartão de cuidados, página de produto). **Painel** é a superfície sobre o café; **Torra** fecha rodapés.

| Token | Nome | HEX | Origem | Uso |
|---|---|---|---|---|
| `--cafe` | Café | `#28170C` | fundo dos posts de 2026 (medido) | campo escuro principal |
| `--cafe-marca` | Café Minas | `#33150A` | letras do logotipo (medido) | título e texto no claro; a marca no claro |
| `--ouro` | Ouro Minas | `#F0B800` | o A e a mecha do logotipo (medido) | marca, botão cheio, numeral e palavra à mão **sobre café** |
| `--mel` `--dourado` `--mata` `--cobre` `--vinho` | A cartela | `#DD9A37` `#E9B43E` `#8B9D30` `#E85529` `#80170F` | faixa do avatar e dos posts (medida) | a cartela, nessa ordem; Vinho também é o destaque e a palavra à mão no claro |
| `--creme` | Creme | `#F1E4D1` | cartão de informação dos posts (medido) | campo claro, painel de informação |
| `--leite` | Leite | `#FBF6EE` | extensão | campo de leitura |
| `--painel` · `--torra` | Painel · Torra | `#3A2316` · `#1B0F07` | extensão | superfície sobre café · rodapé |
| `--canela` · `--tabaco` | Canela · Tabaco | `#C9A98A` · `#6B4A36` | extensão | apoio no café · apoio no claro |
| `--bronze` | Bronze | `#8A5A00` | extensão | o dourado quando precisa ser TEXTO no claro (raro) |
| `--areia` · `--linha-escura` | Linhas | `#E6D5BC` · `#4A3122` | extensão | linhas de 1 px |

**Pares de leitura (WCAG):** branco/Café 17,2 · Creme/Café 13,8 · Ouro/Café 9,5 · Canela/Café 7,8 · Café Minas/Leite 15,6 · Vinho/Leite 9,5 · Tabaco/Leite 7,3 · Café/Ouro 9,5 (texto no botão ouro é sempre Café) · branco/Vinho 10,3. **Proibidos:** Ouro, Dourado ou Mel sobre Leite, Creme ou branco (1,4 a 2,2); branco sobre ouro (1,8); Mata como texto; Cobre sobre Café abaixo de 24 px (4,7).

**Orçamento do ouro (LEI 1):** o ouro ocupa no máximo **5% da área** e marca **uma** coisa por peça (a marca, a mecha OU o botão). Proporção do mês: Café 45 · Leite e Creme 30 · foto 15 · Ouro 5 · cartela 5.

**Saem:** o laranja `#FF4E00` e o Open Sans do tema do site; o gradiente dourado e o brilho em texto e botão; luz colorida em foto. CMYK e Pantone dependem de prova de gráfica (pendência 13); ouro impresso é ouro chapado ou hot stamping, nunca amarelo de quadricromia.

## A cartela (TRAVADA)

Cinco faixas iguais, **sempre na ordem Mel, Dourado, Mata, Cobre, Vinho** (de cima para baixo, ou da esquerda para a direita). Na peça de 1080 px: faixa vertical de **56 px** na borda esquerda, de cima a baixo (`.pc-cartela`); story e reels podem usar a fina de 28 px. Na página: a borda esquerda do `body` (10 px no desktop, 6 no celular). Como régua horizontal (`.cartela`), 8 px. CSS: `linear-gradient(180deg,#DD9A37 0 20%,#E9B43E 20% 40%,#8B9D30 40% 60%,#E85529 60% 80%,#80170F 80% 100%)`. Nunca fora de ordem, com cor trocada, com um tom a mais, inclinada ou em degradê suave. As cores da cartela **não** viram fundo de bloco nem cor de texto (exceto Vinho no claro).

## Tipografia (TRAVADA)

```html
<link rel="stylesheet" href="assets/fontes/fontes.css">
```
(no claude.ai, o link do Google Fonts da regra do navegador)

| Papel | Fonte | Regras |
|---|---|---|
| Títulos, numerais, preço, botão, rótulo | **Montserrat** 800 (título), 700 (subtítulo, botão, rótulo) | É a família do "MINAS" do logotipo. Título de **peça** em caixa alta curta (até 6 palavras), como os posts da loja; título de **documento** em caixa normal. Rótulo em caixa alta, `letter-spacing:.16em`. |
| **A palavra à mão** | **Alex Brush** | **Uma** palavra por título, marcada com `<em>`: a que carrega o sentimento (você, seu, confiança, natural, à mão). 1,3× o corpo do título, ouro no café, Vinho no claro. Nunca frase inteira, nunca em caixa alta, nunca abaixo de 40 px na peça, nunca em texto corrido. |
| Texto, legenda, dado | **Nunito Sans** 400 · 600 · 700 | Corpo 17 px no documento (16 no celular), entrelinha 1,68. |

- **Escala do documento:** display 104/48 · seção 58/34 · subtítulo 34/24 · intertítulo 24/20 · chamada 21/18 · corpo 17/16 · apoio 15 · legenda 13 · rótulo 12.
- **Escala da peça 1080 px** (unidade `--u: calc(100cqw/1080)`): título 84 a 100 (máximo 3 linhas) · subtítulo 48 · corpo 32 a 36 · rótulo e legenda 26 · **piso absoluto de 26 px para qualquer texto** (o post aparece a 36% no celular) · margem 72 (128 à esquerda, por causa da cartela).
- **Legenda de reels:** Montserrat Bold branca, 1 a 3 palavras por vez, a palavra-chave em ouro; sem caixa colorida.
- Se faltar fonte: Montserrat → Arial Black; Nunito Sans → Arial; Alex Brush → Great Vibes. Open Sans, Roboto, Poppins e "Din Next" saem.

## A marca (TRAVADA)

O logotipo publicado pela loja só existe em PNG de 256 × 128 (site, 2023) e dentro das artes do Instagram. As versões de `assets/` são uma **reconstrução vetorial**: MINAS em Montserrat ExtraBold com espaço apertado, o A em ouro, a mecha redesenhada como fita que afina nas pontas (com o fio fino das artes de 2026) cortando as letras, e "Cabelos" em Alex Brush. Rótulo em material que apresenta a marca: "reconstrução vetorial · aguarda o arquivo original" (pendência 1).

A marca é **sempre um arquivo** de `assets/`: nunca redesenhe, redigite "MINAS" em fonte, recolora fora das versões, gire, estique, contorne, aplique sombra, brilho ou gradiente, ponha em caixa branca sobre foto, separe "Cabelos" de "MINAS" ou use o PNG pequeno do site em tamanho grande. **Nunca cole o SVG do logotipo dentro do HTML** (os ids das máscaras colidem): use `<img>`.

| Versão | Arquivo | Fundo |
|---|---|---|
| Completa branca com ouro | `minas-cabelos-completa-branca.svg` / `.png` / `-web.png` | Café, Painel, Torra, Vinho, foto escura com sombra |
| Completa café com ouro | `minas-cabelos-completa-cafe.*` | Leite, Creme, branco, kraft claro |
| Completa sobre café (com fundo) | `minas-cabelos-completa-fundo-cafe.*` | quando a peça precisa do retângulo café |
| Uma cor | `minas-cabelos-completa-mono-cafe.*` · `-mono-branca.*` | carimbo, gravação, cópia P&B, bordado de uma linha |
| Ouro chapado | `minas-cabelos-completa-ouro-chapado.*` | hot stamping, bordado, sacola café |
| **Reduzida** (sem "Cabelos") | `minas-cabelos-reduzida-{cafe,branca,mono-cafe,mono-branca}.*` | entre 90 e 200 px de largura |
| **Símbolo** (o A com a mecha) | `minas-cabelos-simbolo-{ouro,cafe,mono-cafe,branco,branco-ouro}.*` | abaixo de 90 px, selo, rodapé de peça, destaque, bordado pequeno |
| Avatar | `minas-cabelos-avatar.svg` / `-1080.png` / `-640.png` | foto do perfil: marca branca sobre café com a cartela na borda |
| Favicon | `minas-cabelos-favicon.svg` / `-32` `-180` `-512.png` | aba do navegador, atalho |
| Compartilhamento | `minas-cabelos-compartilhamento-1200x630.png` | imagem do link do site |

Proporções para `width`/`height`: completa **1120 × 400**; reduzida **1120 × 250**; símbolo **600 × 600**; avatar 1080 × 1080; favicon 512 × 512.

- **Respiro:** 0,5 M ao redor (M = altura das letras de MINAS, cerca de 52% da altura do arquivo completo). Na peça de 1080 com a marca em 420 u, cerca de 36 u.
- **Tamanho mínimo:** completa **200 px** na tela e **40 mm** no impresso (abaixo disso "Cabelos" perde o traço); reduzida **90 px** e 20 mm; símbolo **24 px** e 6 mm.
- **Na peça de 1080:** completa com 420 a 620 u na capa, na última lâmina e em peça institucional; rodapé com a **reduzida (300 u)** ou o **símbolo (110 u)**. Classes `.pc-marca`, `.pc-marca--grande`, `.pc-marca--rodape`, `.pc-simbolo`.
- **Nome em texto:** "Minas Cabelos" na primeira menção; depois "a Minas" ou "a loja". Nunca "Minas Cabelo" (singular), "MINAS CABELOS" em caixa alta no texto, "Mina's" ou "Minas Hair". @minascabelos · minascabelos.com.br.

## As cinco leis da casa (TRAVADAS)

1. **A cartela abre, a mecha assina.** Toda peça tem a cartela na borda e, no máximo, uma mecha. O ouro é da marca: até 5% da área e nunca texto sobre fundo claro.
2. **Uma palavra à mão por título.** A palavra que carrega o sentimento vai em letra cursiva. Se tudo é à mão, nada é.
3. **Cabelo de verdade, cor de verdade.** Só foto real do produto e de clientes que autorizaram por escrito. Nada de filtro que mude o tom, banco de imagem ou pessoa gerada por IA: a cliente compra a cor que vê.
4. **O que é humano é humano.** Cada produto com o nome certo do material (cabelo humano, orgânico, bio fibra, fibra para tranças), o comprimento em centímetros e o peso em gramas. Origem e qualidade só com documento do fornecedor.
5. **Acolher antes de vender.** Sem pressão, sem urgência falsa, sem explorar insegurança. Preço claro quando aparece, troca explicada antes da compra.

## Arquitetura de marca

| Marca ou frente | Papel | Assina com |
|---|---|---|
| **Minas Cabelos** (loja, @minascabelos) | produto, atendimento, conteúdo, vaga | logotipo completo ou símbolo; avatar = marca branca sobre café com a cartela |
| **Régis** (dono, rosto da loja) | escolha do cabelo, confecção, bastidores | "Régis · Minas Cabelos" em texto; retrato real (pendência 10) |
| **Linhas de produto** | Cabelo Humano · Orgânico · Bio Fibra · Perucas (wigs) · Laces · Próteses · Tic Tac · Fita adesiva (Invisible Hair) · Rabo de Cavalo · Jumbo · Acessórios | nome da linha em texto (rótulo), nunca logotipo próprio |
| **Coleção de perucas** | modelos com nome de mulher (Bianca, Luiza, Nilva, Renata, Tati, Vanuza, Vitória, Wilma; Aline, Bete, Bruna, Carolina, Dalva, Fabian, Monique, Mortiça, Naty) | nome + tipo + material: "Peruca Renata · cabelo humano · 60 cm" |
| **Serviços** | confecção de perucas, próteses, telas de tic tac e fitas adesivas (inclusive com o cabelo da cliente) | "Confecção Minas Cabelos" em texto |
| **Embaixadoras** | clientes e profissionais que divulgam a loja | selo "Parceria Minas Cabelos" e publicidade identificada (pendência 9) |

## Voz e tom

Acolhedora (atende como no balcão, com calma), caprichada (explica textura, cm e gramas), honesta (diz o material e o prazo de verdade), vaidosa sem ser fútil, mineira (próxima, "você", sem gíria forçada). Frase curta, verbo concreto, dado do produto.

- **Diga:** "cabelo humano", "orgânico (fibra que imita o humano)", "60 cm, 150 g", "tom 1B", "dá para lavar, escovar e fazer chapinha" (só se o material permite), "vamos achar o cabelo certo para você", "a gente te ajuda a escolher", "Beleza que gera confiança".
- **Nunca:** "100% natural" para fibra, "virgem", "Remy" ou "brasileiro" sem documento, "garantido", "dura para sempre", "o melhor da região", "última chance" falsa, "QUEIMA", "seu cabelo está ralo?", "acabe com a calvície", "trata queda", "cura".
- **Chamadas:** "Fale com a loja" · "Peça seu orçamento pelo WhatsApp" · "Salve para escolher depois" · "Venha ver de perto em Três Corações" · "Mande uma foto do seu cabelo e a gente indica o tom".
- **Pontuação:** zero travessão; no máximo uma exclamação; nada de caixa alta longa no texto; zero emoji na arte; na legenda e no WhatsApp, no máximo dois (✨ 💛).
- **Cliente em tratamento de saúde:** tom reservado e digno, nunca a doença como gancho, atendimento em particular, foto só com autorização específica.

## Anúncio, preço e consumo (TRAVADO)

Base: Código de Defesa do Consumidor (Lei 8.078/1990: arts. 6º III, 31, 37, 26 e 49), Decreto 7.962/2013 (comércio eletrônico), Lei 10.962/2004 e Decreto 5.903/2006 (preço), Lei 13.455/2017 (preço por forma de pagamento), Código e Guia de Publicidade por Influenciadores do CONAR (2021), LGPD (Lei 13.709/2018) e Código Civil art. 20 (imagem), políticas de anúncio da Meta. Detalhe e exemplos na seção 08 do brand book. **Não substitui orientação jurídica.**

- **Preço:** à vista, claro, perto do produto; parcelado com número de parcelas, valor de cada uma e total. Preço riscado só com o preço anterior real. Frete e prazo informados antes de fechar.
- **Compra à distância** (WhatsApp, site, Instagram): direito de arrependimento em 7 dias (art. 49). Regras de troca por higiene, peça cortada, aplicada ou sob medida: informar **antes** da compra (pendência 5).
- **Site:** razão social, CNPJ, endereço e canal de atendimento visíveis (Decreto 7.962). Enquanto não confirmados: `[confirmar]` (pendência 3).
- **Embaixadora e parceira:** publicidade sempre identificada ("#publi", "parceria paga", "recebi da Minas Cabelos"), cupom identificado.
- **Imagem:** foto de cliente só com autorização por escrito para aquela finalidade (pendência 8); pedido de retirada atendido.
- **Meta (anúncios):** nada que presuma atributo pessoal ("Seu cabelo está caindo?", "Você tem entradas?"), nada de antes e depois que sugira corpo ou aparência ruim, nada de promessa irreal.
- **Saúde:** peruca e prótese não tratam doença. Cosméticos (pomadas, colas, removedores) só anunciados com regularização na Anvisa conferida (pendência 17).

**Aviso de rodapé (anúncio, site, catálogo):** "Cores podem variar conforme a tela. Comprimento e peso conforme a ficha de cada produto. Trocas e devoluções conforme a política da loja e o Código de Defesa do Consumidor."

## Fotografia

Só foto real: produto em manequim ou na mão, textura de perto, comprimento com régua, cliente com autorização. Luz natural lateral (janela) ou luz branca neutra, fundo Leite, Creme ou café liso; uma **cartela de referência** de cor no canto da foto de catálogo ajuda a cliente a comparar tons. Nada de filtro que mude a cor, luz roxa ou rosa, banco de imagem, pessoa ou loja geradas por IA, antes e depois apelativo. As fotos de manequim do site de 2023 estão recortadas em `assets/fotos/` (fundo transparente, cor intacta). A sessão de fotos da loja e do Régis é pendência 10.

## Formas e dados

**`mcforms.js`**: a ilustração da casa, tirada do cabelo e da marca. `<div class="forma-svg" data-mcforms="mecha"></div>` ou `mcforms.render(el, 'regua', {de:30, ate:80, destaque:60})`. Formas: `mecha` (divisor, assinatura) · `cartela` (as cinco faixas, com ou sem nomes) · `fios` (textura de campo café) · `onda` (o ondulado) · `cacho` (o cacheado) · `tranca` (jumbo, box braids) · `regua` (comprimento em cm) · `texturas` (liso, ondulado, cacheado, crespo) · `moldura` (janela da foto com a cartela). Uma forma por peça; `fios` e `onda` só como textura em campo café. **Clichês vedados:** tesoura, secador, pente, silhueta de mulher genérica, coroa, glitter. `mcforms.svg(nome, {campo:'cafe'})` devolve o SVG para colar no Canva.

**`mcviz.js`**: gráficos em SVG puro. `<div class="grafico-svg" data-mcviz='{"tipo":"barras","rotulos":["40 cm","50 cm","60 cm"],"valores":[100,150,200],"destaque":1}'></div>`. Tipos: `barras`, `barras-h`, `linha`, `composicao`, `anel`, `funil`, `fluxo`, `kpi`, `linha-tempo`, `cota`. Um destaque (ouro no café, Vinho no claro), título que já diz a conclusão, fonte e data na legenda. **Nunca** faturamento, vendas, número de clientes ou dado de cliente em peça pública; dado sem fonte leva "Dado ilustrativo".

## Ícones

**Lucide** inline em SVG: traço 1,5, pontas arredondadas, 16/20/24 px, cor do texto ou ouro (café) / Vinho (claro). Nunca emoji na arte, ícone colorido ou 3D. WhatsApp não existe no Lucide: `message-circle`. Canais oficiais: `shield-check`. Comprimento: `ruler`. Envio: `truck` e `package`. Loja: `store` e `map-pin`. Tesoura e coroa ficam fora.

## Componentes canônicos

Os nomes de classe são a interface do sistema: **nunca renomeie**. Todos estão na `<style>` do `brand-book.html` e na seção 13.

| Classe | Uso |
|---|---|
| `.sec` + `.sec--cafe` / `.sec--leite` / `.sec--creme` · `.sec-head` · `.folio` | seção com fólio |
| `.bloco` > `.bloco-head` (`.bloco-n` + `h3` + `.bloco-apoio`) | subseção numerada NN.1 |
| `campo-cafe` · `campo-painel` · `campo-torra` · `campo-vinho` · `campo-leite` · `campo-creme` · `campo-branco` | troca de campo |
| `.cols-2` `.cols-3` `.cols-4` `.cols-7-5` `.cols-5-7` `.cols-8-4` | grades que empilham no celular |
| `em` no título (a palavra à mão) · `.mao` · `.rotulo` · `.chamada` · `.apoio` · `.legenda` · `.olho` | tipografia |
| `.cartela` · `.cartela-v` · `.tons` · `.mecha-div` > `.mecha-svg[data-mcforms=mecha]` · `.pilula` · `.selo` | motivos da casa |
| `.btn` + `--cheio` (lê o campo) `--linha` `--whats` `--bloco` · `.link-seta` | botões, altura mínima 48 |
| `.nota` · `.alerta` · `.certo` | avisos |
| `.faca` / `.nao-faca` · `.par` · `.nf-grid` > `.nf` | Assim / Não assim |
| `.cores` > `.cor` · `.leituras` > `.leitura-par` | fichas de cor |
| `.table-wrap` > `table.consulta` · `.table-wrap.matriz` | tabela que vira cartão no celular · matriz com rolagem |
| `.kpi-grid` > `.kpi` · `.checklist` > `.check-row` | números · checklist |
| `.ficha` > `.ficha-corpo` (`.ficha-tipo`, `h4`, `dl`, `.ficha-preco`) | ficha de produto |
| `.modelo` > `.modelo-texto` + `.copiar` | texto pronto para copiar |
| `.marca-palco` (`--cartela`) · `.marca-ficha` · `.selo-reconstrucao` | marca no documento |
| `.grafico` > `.grafico-svg[data-mcviz]` · `.forma` > `.forma-svg[data-mcforms]` | motores |
| `.mock-quadro` > `.mock` + `--post` `--quadrado` `--story` `--paisagem` `--a4` `--cartao` `--etiqueta` > `.peca` | mockups com `--u` |
| dentro da `.peca`: `.pc-cartela` (`--fina`, `--topo`) · `.pc-area` (`--segura`) · `.pc-marca` · `.pc-simbolo` · `.pc-rotulo` · `.pc-titulo` · `.pc-sub` · `.pc-corpo` · `.pc-mini` · `.pc-btn` · `.pc-preco` · `.pc-pilula` · `.pc-dados` · `.pc-num` · `.pc-foto` · `.pc-sombra` · `.pc-rodape` · `.pc-id` · `.zona-segura` | peça de 1080 |
| deck: `.slide` + `capa` `capa-clara` `secao` `ideia` `stat` `grafico` `compara` `citacao` `passos` `closer` · `aside.notas` | apresentação |

Espaço só na escala de 4 (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).

## Aplicações (medidas na arte final)

| Peça | Formato | Regra principal |
|---|---|---|
| Post de produto | 1080 × 1350 | campo café, foto real recortada, nome + tipo + cm + g; preço na legenda ou na arte só se atualizado |
| Carrossel | 1080 × 1350, até 10 lâminas | capa café com a pergunta e a palavra à mão; miolo Creme com numeral Vinho; última lâmina com chamada, canais e marca |
| Story | 1080 × 1920 | 250 px livres no topo e na base; tudo importante nos 1420 do meio; cartela fina |
| Capa de reels | 1080 × 1920 | título no recorte central 1080 × 1350 |
| Capa de destaque | 1080 × 1080 | ícone Lucide em ouro sobre café, sem texto |
| Catálogo do WhatsApp | 1080 × 1080 | produto recortado sobre Creme, ficha curta, código |
| Status de WhatsApp | 1080 × 1920 | uma novidade, uma chamada |
| Ficha e etiqueta de produto | 50 × 75 mm | tipo, material, cm, g, tom, código, preço |
| Cartão de cuidados | A6 | lavar, pentear, dormir, manutenção, quando voltar |
| Sacola e caixa | por fornecedor | marca branca ou ouro chapado sobre café; cartela como fita |
| Cartão de visita | 90 × 50 mm | assinatura com no mínimo 40 mm |
| Site e loja virtual | 12 colunas | topo café, produto em fundo Leite, rodapé com identificação (Decreto 7.962) |
| Vaga | 1080 × 1350 | campo café, título curto, três itens, como se candidatar; sem gradiente |
| Embaixadora | post e story | selo "Parceria Minas Cabelos" e publicidade identificada |
| Assinatura de e-mail | tabela 600 px | bloco 16 do `lockup.html` |

Detalhe completo, mockups e textos prontos nas seções 14 a 19.

## Dois formatos de primeira classe

**Documento** (`brand-book.html` é o template): leitura, catálogo, manual, proposta. Uma coluna de leitura (680 px de texto), seções numeradas com fólio, sumário depois da introdução, campos alternados café e leite.

**Deck** (`deck-template.html`): apresentação da loja, treinamento, palestra. Canvas 1440 × 900 escalado; `<section class="slide TIPO">` com os dez tipos; setas, espaço, Home/End e toque; **P** abre as notas; **F** tela cheia; `#3` abre o terceiro slide; no celular os slides empilham.

Vai ser **lido** → documento. Vai ser **apresentado** → deck.

## Mobile System v1 (TRAVADO)

Tudo legível e sem corte entre **320 e 430 px**. Breakpoints 1024 e 640 (e 380 para display). Grades empilham; tabelas de consulta viram cartões pelo script `<script data-minas-responsive="v1">` do fim do `brand-book.html` (copie literal); matriz larga com rolagem local sinalizada; mídia com `max-width:100%`; botões de 48 px. **PROIBIDO `overflow-x:hidden` no `html` ou no `body`.**

## Exportar PDF

**Pelo Chrome:** abra o HTML, espere 3 segundos, `Cmd+P`, Salvar como PDF, **Gráficos de segundo plano LIGADO** (sem isso o café some). Documento em retrato; deck em paisagem sem margens.

**Automatizado:** `python3 exportar_pdf.py [arquivo.html]` (Playwright, `print_background=True`). **Nunca use `--print-to-pdf` do Chrome.**

## Pendências com a Minas (não resolva por conta própria)

1. Arquivo original do logotipo (vetor) e nomes das fontes do designer.
2. Nome oficial único ("Minas Cabelos") e o mesmo @ em todas as redes.
3. Razão social, CNPJ, endereço completo da loja e horário.
4. WhatsApp único com conta comercial verificada, telefone e e-mail confirmados.
5. Política de troca, devolução e garantia por tipo de produto.
6. Tabela de preços atualizada e condições de pagamento.
7. Documentos dos fornecedores sobre origem e tipo do cabelo.
8. Termo de autorização de imagem para clientes e embaixadoras.
9. Programa de embaixadoras: nome, regras, benefício e publicidade identificada.
10. Sessão de fotos real: loja, Régis e produtos em luz natural.
11. Depoimentos reais, com nome autorizado.
12. Medidas e fotos da fachada e da loja.
13. Fornecedores de embalagem e prova de cor da gráfica.
14. Serviço de aplicação: quem aplica, onde e como apresentar.
15. Atendimento a quem passa por tratamento de saúde: tom, privacidade e parcerias.
16. Site novo: domínio, plataforma e imagem de compartilhamento.
17. Regularização na Anvisa dos cosméticos e pomadas vendidos.

Quando uma peça esbarrar numa pendência, entregue a versão permitida (dado em `[confirmar]`, preço em `R$ [valor]`, reconstrução da marca, sem o termo que depende de documento) e diga em uma linha qual pendência trava o resto.

## Checklist de aprovação de peça

- [ ] Marca é arquivo de `assets/`, versão certa para o fundo, com respiro de 0,5 M e acima do mínimo.
- [ ] Cartela na borda esquerda, inteira, na ordem Mel, Dourado, Mata, Cobre, Vinho.
- [ ] Só cores da tabela; ouro só sobre café e em até 5% da área; nenhum gradiente ou brilho.
- [ ] Montserrat no título, Nunito Sans no texto, **uma** palavra à mão; nenhum texto da arte de 1080 abaixo de 26 px.
- [ ] Material certo (humano, orgânico, bio fibra, fibra), comprimento em cm e peso em g.
- [ ] Foto real, sem filtro que mude o tom, sem IA, sem banco; pessoa só com autorização por escrito.
- [ ] Preço atualizado, à vista e, se parcelado, com parcelas, valor e total.
- [ ] Nada de "garantido", "dura para sempre", "trata queda", urgência falsa ou frase que aponta defeito na cliente.
- [ ] Parceria e embaixadora com publicidade identificada.
- [ ] Nenhum dado inventado; o que falta em `[confirmar]`.
- [ ] Zero travessão, no máximo uma exclamação, nenhum emoji na arte.
- [ ] Testado no celular: peça a 36% ainda se lê; página sem corte de 320 a 430 px; texto alternativo em toda imagem.

## Gotchas (vão te morder)

1. **Uma única `<style>` por arquivo.** Print e gráfico entram nela.
2. **A marca é arquivo, não código.** Se você está escrevendo `<path>` de logotipo, MINAS em fonte ou data URI de memória, pare: use `assets/` ou o `lockup.html`.
3. **Ouro no claro tem 1,7:1.** No claro, a ênfase é Vinho e a palavra à mão é Vinho.
4. **A palavra à mão não é itálico.** `<em>` no título vira Alex Brush; no texto corrido não existe.
5. **Alex Brush pequena some.** Abaixo de 40 px na peça (ou 28 px na tela), troque por Montserrat 800 na cor de destaque.
6. **A cartela tem ordem.** Mel, Dourado, Mata, Cobre, Vinho. Conferir sempre.
7. **A completa some abaixo de 200 px.** No rodapé do post, a reduzida ou o símbolo.
8. **IDs de SVG únicos** por página (os motores já prefixam `mv` e `mf`).
9. **Dado da loja nunca inventado.** `[confirmar]` até a Minas confirmar.
10. **Orgânico não é humano.** Nem em legenda, nem em hashtag.
11. **`print_background=True`** ou "Gráficos de segundo plano" ligado, senão o café some.
12. **Caminho relativo sempre** (`assets/...`); para enviar, `python3 autocontido.py`.

## O que a Cartela Mineira NÃO é

- Não é salão de luxo genérico: nada de mármore, brilho, coroa, glitter, ouro em folha.
- Não é clichê de beleza: nada de tesoura, secador, pente ou silhueta de mulher como enfeite.
- Não é liquidação: nada de "QUEIMA", contagem regressiva falsa ou preço riscado sem preço anterior real.
- Não é banco de imagem nem pessoa gerada por IA.
- Não é a marca redesenhada, recolorida ou digitada.
- Não é a cartela fora de ordem, com cores trocadas ou em degradê.

---

Marca, logotipo e nome são propriedade da Minas Cabelos (Três Corações, MG). Os motores `mcviz.js` e `mcforms.js` foram escritos para este sistema. Sistema de identidade organizado com a GrowAI. Cartela Mineira v1 · setembro de 2026.
