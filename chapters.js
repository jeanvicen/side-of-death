/*
 * SIDE OF DEATH — conteúdo editável por capítulos
 *
 * Para criar ou atualizar conteúdo, edite este arquivo. O motor em index.html
 * lê SOD_CONTENT e não precisa ser alterado para trocar textos, cenas, assets,
 * número de ondas, inimigos ou parâmetros básicos da fase.
 */
window.SOD_CONTENT = {
  version: '2.0.0',
  activeChapter: 1,
  audio: {
    introMusic: './assets/intro-ost-90s.wav',
    ambience: './assets/cemetery-ambience.wav',
    voices: [
      './assets/voice-cine-01.wav',
      './assets/voice-cine-02.wav',
      './assets/voice-cine-03.wav',
      './assets/voice-cine-04.wav',
      './assets/voice-cine-05.wav',
      './assets/voice-cine-06.wav',
      './assets/voice-cine-07.wav',
      './assets/voice-cine-08.wav'
    ]
  },
  defaults: {
    worldWidth: 5200,
    floorY: 430,
    gravity: 1680,
    maxDelta: 0.045,
    cameraSmoothing: 0.105,
    wavesToAdvance: 50,
    spawnDistance: 760
  },
  chapters: {
    1: {
      id: 1,
      title: 'CAPÍTULO 1',
      subtitle: 'O CEMITÉRIO QUE RESPIRA',
      objective: 'AS ALMAS FUGITIVAS\\nDEVOLVA-AS AO SILÊNCIO',
      world: {
        background: './assets/world-01-stage.png',
        accent: '#ff3048',
        fog: '#8f8ca8',
        layers: [
          { image: './assets/world-01-stage.png', speed: 0.15, alpha: 0.82 },
          { image: './assets/world-01-stage.png', speed: 0.34, alpha: 0.36 }
        ]
      },
      intro: [
        { image: './assets/cine-01-cemetery.png', caption: 'Quando os sinos se calam, o cemitério ainda respira.\\nSob a lua vermelha, a fronteira entre os mundos começou a ceder.', voice: 0, duration: 10000, effect: 'wind-bells', particles: 'mist' },
        { image: './assets/cine-02-fugitive-souls.png', caption: 'Uma a uma, as almas recusaram o chamado.\\nElas rasgaram o véu e correram para onde nenhuma sentença alcança.', voice: 1, duration: 10000, effect: 'whispers', particles: 'souls' },
        { image: './assets/cine-02-fugitive-souls.png', caption: 'A Morte ouviu o primeiro grito antes mesmo que ele nascesse.\\nNão era apenas uma fuga. Era uma invasão.', voice: 2, duration: 10000, effect: 'heartbeat', particles: 'embers' },
        { image: './assets/cine-03-portal.png', caption: 'No coração do cemitério, a ferida se abriu.\\nPedra, luz e memória puxavam os fugitivos para além da vida.', voice: 3, duration: 10500, effect: 'portal', particles: 'portal' },
        { image: './assets/cine-04-reaper-gate.png', caption: 'A Morte atravessou o clarão sem dizer uma palavra.\\nA foice respondeu por ela.', voice: 4, duration: 10500, effect: 'scythe', particles: 'sparks' },
        { image: './assets/cine-05-souls-gate.png', caption: 'O primeiro fugitivo caiu além dos portões.\\nE cada passo abriu uma nova rachadura no silêncio.', voice: 5, duration: 10500, effect: 'footsteps', particles: 'rain' },
        { image: './assets/cine-02-fugitive-souls.png', caption: 'Cinquenta ondas separavam a Morte do coração da fuga.\\nNenhuma alma seria deixada para trás.', voice: 6, duration: 10000, effect: 'choir', particles: 'souls' },
        { image: './assets/cine-03-portal.png', caption: 'O portão se abriu.\\nA perseguição começa agora.', voice: 7, duration: 8500, effect: 'impact', particles: 'embers' }
      ],
      waves: {
        total: 50,
        introEvery: 5,
        baseCount: 2,
        maxCount: 10,
        spawnGap: 175,
        intermission: 1.65,
        variants: [
          { id: 'wisp', every: 1, hp: 1, speed: 82, damage: 9, size: 1, color: '#9deaff', sheet: './assets/enemy-01-soul-sheet.png', weight: 6 },
          { id: 'shade', every: 3, hp: 2, speed: 112, damage: 12, size: 1.1, color: '#d39cff', sheet: './assets/enemy-02-shade-sheet.png', weight: 3 },
          { id: 'soul', every: 5, hp: 3, speed: 62, damage: 16, size: 1.2, color: '#ff7282', sheet: './assets/enemy-01-soul-sheet.png', weight: 2 },
          { id: 'harbinger', every: 10, hp: 5, speed: 48, damage: 20, size: 1.42, color: '#ff3048', sheet: './assets/enemy-03-harbinger-sheet.png', weight: 1 }
        ]
      }
    },
    2: {
      id: 2,
      title: 'CAPÍTULO 2',
      subtitle: 'A CIDADE SOB O VÉU',
      objective: 'O PORTAL FUGIU\\nA CIDADE AGORA RESPIRA',
      world: { background: './assets/world-02-city-under-veil.png', accent: '#7deaff', fog: '#657ca4', layers: [] },
      intro: [],
      waves: { total: 50, introEvery: 5, baseCount: 3, maxCount: 12, spawnGap: 155, intermission: 1.4, variants: [] }
    }
  }
};
