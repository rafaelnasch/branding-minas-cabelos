# branding-minas-cabelos

**A identidade visual da Minas Cabelos, empacotada como uma Skill do Claude.** Sistema Cartela Mineira v1.

Instale uma vez e peça o material em português. O Claude passa a produzir post, carrossel, story, reels, catálogo e mensagens de WhatsApp, ficha e etiqueta de produto, sacola, cartão de cuidados, site, vaga, material de embaixadora, apresentação e e-mail **já no padrão da Minas**: cor certa, fonte certa, marca certa, tom certo e as regras de anúncio e consumo, sem você precisar explicar nada disso de novo.

> "Faz um post da Minas Cabelos da peruca Renata, cabelo humano, 60 cm."
> "Monta um carrossel de 6 lâminas no padrão da Minas sobre como escolher o comprimento do mega hair."
> "Cria a mensagem de pós-venda do WhatsApp com os cuidados do tic tac."

**Ver o brand book no navegador:** [rafaelnasch.github.io/branding-minas-cabelos](https://rafaelnasch.github.io/branding-minas-cabelos/) (abre em qualquer aparelho, sem instalar nada).

---

## O que vem na caixa

| Arquivo | O que é |
|---|---|
| `SKILL.md` | O estilo inteiro, travado: cores e a cartela, tipografia e a palavra à mão, a marca, as cinco leis, voz, anúncio e consumo, medidas de cada peça, celular e PDF. É o que o Claude lê. |
| `brand-book.html` | **Abra primeiro.** O manual vivo em 24 seções, com modelos de peça em tamanho real, e o template pronto de **documento**. |
| `deck-template.html` | O esqueleto de **apresentação**: dez tipos de slide em 1440 × 900, navegação por seta, notas na tecla **P**. |
| `lockup.html` | Os snippets prontos: marca em arquivo e em data URI, cartela, mecha, palavra à mão, identificação da loja, selo de canais oficiais, aviso de rodapé, publicidade de embaixadora, ficha de produto, assinatura de e-mail e botão de WhatsApp. |
| `guia-de-uso.html` | Exemplos de pedido e do que a skill entrega, para quem vai usar no dia a dia. |
| `mcviz.js` | Motor de gráficos em SVG puro: barras, ranking, linha, composição, anel, funil, fluxo, número em destaque, linha do tempo e cota. |
| `mcforms.js` | Motor de formas da casa: mecha, cartela, fios, onda, cacho, trança, régua de comprimento, texturas e moldura. |
| `dist/` | **Para enviar a alguém.** Versões de arquivo único (imagens, fontes e motores embutidos). Abrem sozinhas no e-mail, WhatsApp, Drive e celular. |
| `autocontido.py` | Gera o `dist/` de novo: `python3 autocontido.py`. Também transforma qualquer HTML novo: `python3 autocontido.py meu-material.html`. |
| `exportar_pdf.py` | Exporta documento ou apresentação em PDF com o Playwright. |
| `assets/` | A marca em SVG e PNG (completa, reduzida, símbolo, avatar, favicon, em café, branca, uma cor e ouro chapado), a cartela e os desenhos de construção (`formas/`), as fotos de produto recortadas (`fotos/`), as fontes (`fontes/`) e os arquivos publicados que serviram de base (`referencia-original/`). |

## Instalar

O nome da pasta tem que ser exatamente `branding-minas-cabelos`, com o `SKILL.md` dentro.

### Claude Code (terminal, VS Code, app de desktop)

```bash
git clone https://github.com/rafaelnasch/branding-minas-cabelos.git ~/.claude/skills/branding-minas-cabelos
```

Abra uma sessão nova e digite `/branding-minas-cabelos`, ou simplesmente peça "faz no padrão da Minas Cabelos". Para atualizar:

```bash
cd ~/.claude/skills/branding-minas-cabelos && git pull
```

### Claude no navegador ou no celular (claude.ai)

1. Baixe o ZIP pronto na página de **[Releases](https://github.com/rafaelnasch/branding-minas-cabelos/releases/latest)**: o arquivo `branding-minas-cabelos.zip`.
2. No Claude, vá em **Settings, Capabilities, Skills** e envie o ZIP.

> Use o ZIP do Releases, **não** o "Code, Download ZIP" do GitHub: aquele vem com o nome da pasta trocado (`branding-minas-cabelos-main`) e a skill sobe com o nome errado.

### Codex CLI

```bash
git clone https://github.com/rafaelnasch/branding-minas-cabelos.git ~/.codex/skills/branding-minas-cabelos
```

## O primeiro teste

Abra uma conversa nova e peça:

> "Faz um post 1080 × 1350 no padrão da Minas Cabelos da peruca Vanuza."

Se vier campo café, a cartela de cinco cores na borda esquerda, título curto em Montserrat com **uma** palavra em letra cursiva, a foto do produto, material, comprimento e peso, e a marca branca com ouro, está funcionando. Se vier um post genérico, a skill não carregou: feche e abra o Claude de novo e confira se a pasta se chama exatamente `branding-minas-cabelos` e tem o `SKILL.md` dentro.

## Usar

- **"faz no padrão da Minas"** já aciona a skill;
- diga **qual peça** (post, carrossel, story, reels, catálogo, mensagem de WhatsApp, etiqueta, cartão de cuidados, página, vaga, apresentação, e-mail) e **o tema ou o produto**: a skill já sabe a medida de cada formato;
- informe o **material, o comprimento e o peso** do produto; o que faltar sai como `[confirmar]`;
- preço só aparece se você passar o valor atualizado; senão sai `R$ [valor]`;
- para **PDF**: abra o HTML no Chrome, espere uns 3 segundos, `Cmd+P`, **Salvar como PDF** e, em "Mais configurações", ligue **Gráficos de segundo plano**. Sem isso o fundo café some. Apresentação: layout **Paisagem**, margens **Nenhuma**.

## As cinco leis da casa

1. **A cartela abre, a mecha assina.** Toda peça tem a cartela na borda e, no máximo, uma mecha. O ouro é da marca: até 5% da área e nunca texto sobre fundo claro.
2. **Uma palavra à mão por título.** A palavra que carrega o sentimento vai em letra cursiva. Se tudo é à mão, nada é.
3. **Cabelo de verdade, cor de verdade.** Só foto real do produto e de clientes que autorizaram por escrito. Nada de filtro que mude o tom, banco de imagem ou pessoa gerada por IA.
4. **O que é humano é humano.** Cada produto com o nome certo do material, o comprimento em centímetros e o peso em gramas. Origem e qualidade só com documento do fornecedor.
5. **Acolher antes de vender.** Sem pressão, sem urgência falsa, sem explorar insegurança. Preço claro quando aparece, troca explicada antes da compra.

## A marca

O logotipo da Minas Cabelos **nunca** é redesenhado, redigitado ou recolorido fora das versões. É sempre um dos arquivos de `assets/`. Fundo café pede a versão branca com ouro; fundo claro pede a versão café com ouro; carimbo e gravação pedem a de uma cor; sacola e bordado pedem o ouro chapado. Abaixo de 200 px de largura entra a reduzida (sem "Cabelos"); abaixo de 90 px, o símbolo (o A com a mecha). Os arquivos são uma **reconstrução vetorial** feita a partir dos arquivos publicados pela loja e serão trocados, com o mesmo nome, quando o arquivo original do designer chegar.

## Pendências com a Minas

Até cada uma ser resolvida, a skill entrega só a versão permitida. A lista completa, com o que fica travado e o que fazer enquanto isso, está na seção 23 do brand book e no `SKILL.md`.

## Navegador

Chrome, Edge ou Safari recentes (iOS 16 ou mais novo, Chrome 105 ou mais novo).

---

Marca, logotipo e nome são propriedade da **Minas Cabelos** (Três Corações, MG). Fontes Montserrat, Nunito Sans e Alex Brush sob SIL Open Font License. Os motores `mcviz.js` e `mcforms.js` foram escritos para este sistema. Sistema de identidade organizado com a GrowAI. Cartela Mineira v1 · setembro de 2026.
