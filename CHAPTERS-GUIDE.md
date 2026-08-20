# Guia de atualização por capítulos

O conteúdo editável do jogo fica concentrado em `chapters.js`. O `index.html` contém o motor, os controles e o menu original; para criar novas cenas, trocar textos, substituir cenários ou ajustar ondas, a edição normal deve acontecer somente no arquivo central.

## Estrutura do arquivo

`SOD_CONTENT.activeChapter` define o capítulo que entra após PLAY. Cada capítulo contém título, subtítulo, objetivo, cenário, cinematics e uma configuração de ondas. O capítulo seguinte pode ser preparado antes de estar liberado alterando o objeto correspondente em `chapters`.

| Campo | O que controla | Exemplo |
|---|---|---|
| `title` | Letreiro do capítulo | `CAPÍTULO 2` |
| `subtitle` | Nome narrativo do cenário | `A CIDADE SOB O VÉU` |
| `objective` | Texto do HUD; use `\\n` para quebrar linha | `O PORTAL FUGIU\\nA CIDADE AGORA RESPIRA` |
| `world.background` | Imagem principal repetida no parallax | `./assets/world-02-city-under-veil.png` |
| `intro` | Lista de planos cinematográficos | `image`, `caption`, `voice`, `duration`, `effect`, `particles` |
| `waves.total` | Quantidade de ondas antes do botão de avanço | `50` |
| `waves.variants` | Tipos de NPC liberados por onda | `wisp`, `shade`, `soul`, `harbinger` |

## Como adicionar uma cena

Adicione um objeto dentro de `intro`. `image` aponta para um PNG dentro de `assets`, `caption` é o texto visível, `voice` é o índice da voz em `audio.voices`, e `duration` está em milissegundos. Os efeitos disponíveis atualmente são `wind-bells`, `whispers`, `heartbeat`, `portal`, `scythe`, `footsteps`, `choir` e `impact`. Para partículas, use `mist`, `souls`, `embers`, `portal`, `sparks` ou `rain`.

```js
{
  image: './assets/cine-06-city-gate.png',
  caption: 'A cidade fechou suas portas.\\nMas alguma coisa ainda observa das janelas.',
  voice: 8,
  duration: 10000,
  effect: 'whispers',
  particles: 'souls'
}
```

O texto falado precisa estar no arquivo de voz correspondente. A narração é desbloqueada no primeiro gesto do usuário e toca sobre a ambiência e a trilha sem que as instruções de atuação sejam lidas.

## Como configurar ondas e NPCs

Cada variante possui `every`, que define a primeira onda em que ela aparece, `hp`, `speed`, `damage`, `size`, `color`, `sheet` e `weight`. O motor aumenta gradualmente a quantidade de almas e a vida dos inimigos ao longo das ondas. A fase mostra o botão `PRÓXIMO CAPÍTULO` somente depois de vencer o valor definido em `waves.total`.

```js
{
  id: 'shade',
  every: 3,
  hp: 2,
  speed: 112,
  damage: 12,
  size: 1.1,
  color: '#d39cff',
  sheet: './assets/enemy-02-shade-sheet.png',
  weight: 3
}
```

Depois de editar o conteúdo, execute `npm run build`. Para atualizar também os projetos nativos, execute `npx cap sync`. O service worker precisa conter os novos caminhos em `APP_SHELL` para o cache offline receber os arquivos.

> Regra prática: conteúdo vai em `chapters.js`; código do motor só deve ser alterado quando for necessário criar uma mecânica nova que ainda não existe.
