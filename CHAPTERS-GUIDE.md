# Guia rápido de atualização

O jogo foi organizado para que o conteúdo normal seja alterado em `chapters.js`. O arquivo `README.md` é o manual completo; este arquivo é a referência rápida para criar uma fase sem estudar o motor.

## Ordem de atualização

Primeiro coloque os PNGs e WAVs novos em `assets/`. Depois edite `chapters.js`, adicione os caminhos ao array `APP_SHELL` de `sw.js`, execute `npm run build`, teste em landscape e faça commit/push.

```bash
npm run build
git add -A
git commit -m "Update chapter"
git push origin main
```

## Campos principais

| Campo | Uso |
|---|---|
| `activeChapter` | Número do capítulo que começa após PLAY |
| `assets` | Registro dos sprites e cenários principais |
| `controls` | Teclas do jogador |
| `defaults` | Largura, chão, gravidade e câmera |
| `player` | Vida, velocidade, pulo duplo, rolamento, combos e foice |
| `enemyAI` | Agressividade e poderes dos NPCs |
| `difficulty` | Escalonamento e onda do Boss |
| `chapters[n]` | História e regras de uma fase |

## Novo capítulo

```js
3: {
  id: 3,
  title: 'CAPÍTULO 3',
  subtitle: 'NOME DO CENÁRIO',
  objective: 'OBJETIVO\\nSEGUNDA LINHA',
  world: {
    background: './assets/world-03.png',
    accent: '#ff3048',
    fog: '#807899',
    layers: []
  },
  intro: [],
  waves: {
    total: 50,
    baseCount: 3,
    maxCount: 12,
    spawnGap: 160,
    intermission: 1.5,
    variants: []
  },
  boss: null
}
```

## Cinematics e vozes

Cada objeto de `intro` pode usar `label`, `image`, `caption`, `voice`, `duration`, `effect` e `particles`. O índice `voice` aponta para `audio.voices`. Para evitar cortes, mantenha em `audio.voiceDurations` a duração real de cada WAV em segundos e use `audio.holdAfterVoice` para definir o respiro final. O motor usa a maior duração entre o campo da cena e a duração medida da voz mais o respiro; portanto, não reduza `duration` abaixo do tamanho da fala. A troca de plano usa crossfade entre dois layers, com pan/zoom, letterbox, partículas e barra de progresso.

Exemplo de áudio editável:

```js
audio: {
  voices: ['./assets/voice-cine-01.wav'],
  voiceDurations: [15.68],
  holdAfterVoice: 1.65
}
```

A versão web não chama `requestFullscreen`, pois o navegador mostra uma mensagem própria de orientação quando o faz. A experiência continua horizontal; no Capacitor, Android/iOS mantêm landscape pelo wrapper nativo. Para atualizar o cache dos celulares, aumente `CACHE_NAME` em `sw.js` quando adicionar uma versão relevante.

## NPC novo

`every` indica a primeira onda em que o NPC aparece. `weight` altera a frequência. `sheet` aponta para a folha 4×2 transparente. Os poderes são definidos por `enemyAI.behaviors` usando o mesmo `id`.

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

## Combos e habilidades

O ataque usa `K`. A sequência normal está em `player.combos`. `S + K` usa `crouchCombo` e cria o gancho rasteiro. `W + K` no ar usa `airCombo`. `L` lança a foice em chamas; `Shift` faz o rolamento com invulnerabilidade curta; dois toques de `W` executam o pulo duplo. Ajuste cooldowns, dano, velocidade e janela de combo no objeto `player`.

## Boss da onda 50

O bloco `boss` do capítulo controla nome, vida, sprite, arena, fases por percentual de vida e poderes. O Boss só é invocado na onda definida em `boss.wave` ou em `difficulty.bossWave`. A configuração atual usa a Bruxa do Véu com chuva de fogo, teleporte, três orbes e ataque de garras.

```js
boss: {
  wave: 50,
  id: 'witch',
  name: 'A BRUXA DO VÉU',
  sheet: './assets/boss-01-witch-sheet.png',
  hp: 420,
  size: 2.05,
  arenaBackground: './assets/world-03-witch-arena.png'
}
```

## O que não editar

Não edite `www/`, porque é uma saída gerada. Não remova os arquivos do menu. Não coloque senhas, keystores ou credenciais no GitHub. Para uma nova mecânica que não esteja descrita neste guia, leia primeiro o README e só então altere o motor em `index.html`.
