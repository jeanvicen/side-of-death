/*
 * SIDE OF DEATH — conteúdo e regras editáveis
 *
 * ESTE É O ARQUIVO PRINCIPAL PARA ATUALIZAR O JOGO SEM EDITAR O MOTOR.
 * Edite textos, capítulos, cenários, inimigos, ondas, física e combate aqui.
 * O motor em index.html lê SOD_CONTENT e permanece genérico.
 */
window.SOD_CONTENT = {
  version: '3.1.0',
  activeChapter: 1,

  audio: {
    introMusic: './assets/intro-ost-90s.wav',
    ambience: './assets/cemetery-ambience.wav',
    voices: [
      './assets/voice-cine-01.wav', './assets/voice-cine-02.wav',
      './assets/voice-cine-03.wav', './assets/voice-cine-04.wav',
      './assets/voice-cine-05.wav', './assets/voice-cine-06.wav',
      './assets/voice-cine-07.wav', './assets/voice-cine-08.wav'
    ],
    // Duração medida dos WAVs. O motor acrescenta holdAfterVoice para não cortar a fala.
    voiceDurations: [15.68, 11.84, 14.08, 17.24, 9.80, 11.20, 9.88, 6.96],
    holdAfterVoice: 1.65
  },

  assets: {
    playerSheet: './assets/player-01-reaper-sheet.png',
    soulSheet: './assets/enemy-01-soul-sheet.png',
    shadeSheet: './assets/enemy-02-shade-sheet.png',
    harbingerSheet: './assets/enemy-03-harbinger-sheet.png',
    witchBossSheet: './assets/boss-01-witch-sheet.png',
    chapter1World: './assets/world-01-stage.png',
    chapter2World: './assets/world-02-city-under-veil.png',
    bossWorld: './assets/world-03-witch-arena.png'
  },

  controls: {
    left: 'a',
    right: 'd',
    jump: 'w',
    crouch: 's',
    attack: 'k',
    throwScythe: 'l',
    roll: 'shift',
    pause: 'escape'
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

  player: {
    maxHp: 100,
    runSpeed: 250,
    crouchSpeed: 118,
    jumpVelocity: -560,
    doubleJumpVelocity: -475,
    maxJumps: 2,
    airControl: 0.74,
    rollSpeed: 470,
    rollDuration: 0.30,
    rollCooldown: 0.68,
    rollInvulnerable: 0.22,
    attackCooldown: 0.34,
    attackDuration: 0.36,
    comboWindow: 0.72,
    throwCooldown: 1.05,
    throwSpeed: 780,
    throwGravity: 95,
    throwDamage: 4,
    throwFlameDamage: 2,
    throwReturnTime: 2.4,
    combos: [
      { name: 'CORTE HORIZONTAL', kind: 'sweep', activeStart: 0.10, activeEnd: 0.28, width: 118, height: 82, damage: 1, knockback: 410 },
      { name: 'CORTE ASCENDENTE', kind: 'uppercut', activeStart: 0.08, activeEnd: 0.25, width: 102, height: 112, damage: 2, knockback: 470, launch: -250 },
      { name: 'EXECUÇÃO', kind: 'finisher', activeStart: 0.07, activeEnd: 0.29, width: 142, height: 105, damage: 3, knockback: 610, launch: -120 }
    ],
    crouchCombo: { name: 'GANCHO RASTEIRO', kind: 'low', activeStart: 0.08, activeEnd: 0.27, width: 128, height: 54, damage: 2, knockback: 520 },
    airCombo: { name: 'CORTE AÉREO', kind: 'air', activeStart: 0.08, activeEnd: 0.28, width: 122, height: 100, damage: 2, knockback: 380, launch: 110 }
  },

  enemyAI: {
    alwaysAggro: true,
    aggroRadius: 1500,
    stopDistance: 118,
    separation: 76,
    idlePressureDelay: 0.65,
    attackCooldown: 1.25,
    powerCooldown: 3.6,
    powerRange: 520,
    maxSimultaneousPowerAttacks: 2,
    avoidOffscreenSpawns: true,
    behaviors: {
      wisp: { power: 'dash', powerDamage: 11, powerSpeed: 310, powerDuration: 0.50 },
      shade: { power: 'blink', powerDamage: 15, powerSpeed: 180, powerDuration: 0.34 },
      soul: { power: 'burst', powerDamage: 18, powerSpeed: 120, powerDuration: 0.70 },
      harbinger: { power: 'shockwave', powerDamage: 24, powerSpeed: 74, powerDuration: 0.90 }
    }
  },

  difficulty: {
    hpPerWave: 0.075,
    speedPerWave: 0.006,
    damagePerWave: 0.018,
    countEveryWaves: 4,
    eliteEveryWaves: 10,
    bossWave: 50,
    bossWarningWave: 48
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
        ],
        bossBackground: './assets/world-03-witch-arena.png'
      },
      intro: [
        { label: 'CENA 01 · O CEMITÉRIO', image: './assets/cine-01-cemetery.png', caption: 'Quando os sinos se calam, o cemitério ainda respira.\\nSob a lua vermelha, a fronteira entre os mundos começou a ceder.', voice: 0, duration: 17350, effect: 'wind-bells', particles: 'mist' },
        { label: 'CENA 02 · ALMAS FUGITIVAS', image: './assets/cine-02-fugitive-souls.png', caption: 'Uma a uma, as almas recusaram o chamado.\\nElas rasgaram o véu e correram para onde nenhuma sentença alcança.', voice: 1, duration: 13500, effect: 'whispers', particles: 'souls' },
        { label: 'CENA 03 · O PRIMEIRO GRITO', image: './assets/cine-02-fugitive-souls.png', caption: 'A Morte ouviu o primeiro grito antes mesmo que ele nascesse.\\nNão era apenas uma fuga. Era uma invasão.', voice: 2, duration: 15750, effect: 'heartbeat', particles: 'embers' },
        { label: 'CENA 04 · A FERIDA', image: './assets/cine-03-portal.png', caption: 'No coração do cemitério, a ferida se abriu.\\nPedra, luz e memória puxavam os fugitivos para além da vida.', voice: 3, duration: 18900, effect: 'portal', particles: 'portal' },
        { label: 'CENA 05 · A FOICE', image: './assets/cine-04-reaper-gate.png', caption: 'A Morte atravessou o clarão sem dizer uma palavra.\\nA foice respondeu por ela.', voice: 4, duration: 11500, effect: 'scythe', particles: 'sparks' },
        { label: 'CENA 06 · ALÉM DOS PORTÕES', image: './assets/cine-05-souls-gate.png', caption: 'O primeiro fugitivo caiu além dos portões.\\nE cada passo abriu uma nova rachadura no silêncio.', voice: 5, duration: 12900, effect: 'footsteps', particles: 'rain' },
        { label: 'CENA 07 · CINQUENTA ONDAS', image: './assets/cine-02-fugitive-souls.png', caption: 'Cinquenta ondas separavam a Morte do coração da fuga.\\nNenhuma alma seria deixada para trás.', voice: 6, duration: 11550, effect: 'choir', particles: 'souls' },
        { label: 'CENA 08 · A PERSEGUIÇÃO', image: './assets/cine-03-portal.png', caption: 'O portão se abriu.\\nA perseguição começa agora.', voice: 7, duration: 8600, effect: 'impact', particles: 'embers' }
      ],
      waves: {
        total: 50,
        introEvery: 5,
        baseCount: 2,
        maxCount: 11,
        spawnGap: 175,
        intermission: 1.65,
        variants: [
          { id: 'wisp', every: 1, hp: 1, speed: 82, damage: 9, size: 1, color: '#9deaff', sheet: './assets/enemy-01-soul-sheet.png', weight: 6 },
          { id: 'shade', every: 3, hp: 2, speed: 112, damage: 12, size: 1.1, color: '#d39cff', sheet: './assets/enemy-02-shade-sheet.png', weight: 3 },
          { id: 'soul', every: 5, hp: 3, speed: 62, damage: 16, size: 1.2, color: '#ff7282', sheet: './assets/enemy-01-soul-sheet.png', weight: 2 },
          { id: 'harbinger', every: 10, hp: 5, speed: 48, damage: 20, size: 1.42, color: '#ff3048', sheet: './assets/enemy-03-harbinger-sheet.png', weight: 1 }
        ]
      },
      boss: {
        wave: 50,
        id: 'witch',
        name: 'A BRUXA DO VÉU',
        title: 'GUARDIÃ DAS CINZAS',
        sheet: './assets/boss-01-witch-sheet.png',
        hp: 420,
        maxHp: 420,
        size: 2.05,
        speed: 58,
        damage: 24,
        color: '#ff506b',
        arenaBackground: './assets/world-03-witch-arena.png',
        phases: [
          { at: 1.0, name: 'INVOCAÇÃO', power: 'fireRain', cooldown: 3.8 },
          { at: 0.68, name: 'DANÇA DAS CINZAS', power: 'teleport', cooldown: 3.0 },
          { at: 0.34, name: 'FOME DO VÉU', power: 'tripleOrb', cooldown: 2.25 }
        ],
        attacks: [
          { id: 'claw', range: 150, damage: 24, cooldown: 1.4 },
          { id: 'fireRain', range: 800, damage: 18, cooldown: 3.8 },
          { id: 'teleport', range: 600, damage: 10, cooldown: 3.0 },
          { id: 'tripleOrb', range: 900, damage: 15, cooldown: 2.25 }
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
      waves: { total: 50, introEvery: 5, baseCount: 3, maxCount: 12, spawnGap: 155, intermission: 1.4, variants: [] },
      boss: null
    }
  }
};
