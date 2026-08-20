# SIDE OF DEATH

**Side of Death** é um jogo web estático de ação 2D em pixel-art gótica, publicado no Vercel e empacotado com Capacitor para Android e iOS. O menu original, a introdução cinematográfica e o jogo são servidos pelo mesmo projeto.

> Regra principal para atualizar o conteúdo: edite `chapters.js`. Textos, capítulos, cenários, vozes, ondas, inimigos, física, controles, combos, habilidades e Boss estão documentados e configuráveis ali. O `index.html` deve ser alterado somente quando uma mecânica nova não existir no motor.

## Comece aqui

Para executar localmente, instale Node.js 22 ou superior, instale as dependências e inicie o servidor:

```bash
npm install
npm run dev
```

Abra `http://localhost:4173`. Para testar exatamente os arquivos que serão publicados, gere a pasta `www`:

```bash
npm run build
npm run preview
```

O comando de build apaga e recria `www/`, copiando o motor, `chapters.js`, service worker, fontes, ícones e toda a pasta `assets/`.

## Atualização sem assistência

A sequência recomendada para uma atualização de conteúdo é editar `chapters.js`, colocar os novos PNGs/WAVs em `assets/`, adicionar os caminhos ao inventário do service worker em `sw.js` e executar `npm run build`. Para publicar na web, faça commit e push no branch `main`; o Vercel realiza o deployment automático.

```bash
npm run build
git add -A
git commit -m "Update chapter content"
git push origin main
```

Se a alteração também for para Android ou iOS, sincronize o Capacitor:

```bash
npx cap sync
```

Para abrir os projetos nativos, use `npx cap open android` em um ambiente Android Studio ou `npx cap open ios` em um Mac com Xcode. A assinatura Android depende do keystore privado local e nunca deve ser enviada ao GitHub.

## Mapa completo do projeto

| Arquivo ou pasta | Responsabilidade | Quando editar |
|---|---|---|
| `index.html` | Menu original, DOM/CSS, máquina de estados, canvas, física e motor de combate | Apenas para criar uma mecânica nova no motor |
| `chapters.js` | Conteúdo e parâmetros editáveis: capítulos, cenas, áudio, ondas, IA, controles, combos, habilidades e Boss | Quase toda atualização normal |
| `CHAPTERS-GUIDE.md` | Guia rápido dos campos editáveis | Quando novos campos forem adicionados |
| `PLAN.md` | Objetivos e critérios da expansão | Planejamento de novas fases |
| `STRUCTURE.md` | Arquitetura e estados do jogo | Mudanças estruturais no motor |
| `ASSETS.md` | Inventário dos PNGs, WAVs e folhas de sprite | Ao adicionar ou remover assets |
| `PUBLISHING.md` | PWA, Capacitor, assinatura e publicação | Ao mudar o processo de distribuição |
| `MOBILE-TEST-NOTES.md` | Evidências dos testes locais e públicos | Após cada teste de release |
| `scripts/build.mjs` | Copia os arquivos para `www/` | Se surgir um novo tipo de arquivo de distribuição |
| `scripts/inspect-cinematic-media.py` | Mede duração dos WAVs e dimensões dos frames da cinematics | Ao trocar uma voz ou plano |
| `sw.js` | Cache offline e estratégia de atualização | Ao adicionar assets que precisam funcionar offline |
| `assets/` | Imagens, folhas de sprite, áudio e efeitos | Ao criar conteúdo visual ou sonoro |
| `www/` | Saída gerada; não é a fonte de edição | Nunca editar manualmente |
| `android/` | Projeto Android gerado pelo Capacitor | Assinatura e ajustes nativos específicos |
| `ios/` | Projeto iOS gerado pelo Capacitor | Certificados e ajustes nativos no Xcode |

## Arquivo central `chapters.js`

O objeto `SOD_CONTENT` possui cinco áreas principais. `audio` aponta para a trilha, ambiência e vozes. `assets` registra os sprites e cenários principais. `controls` define as teclas. `defaults`, `player`, `enemyAI` e `difficulty` controlam regras globais. `chapters` contém os capítulos que o jogador percorre.

| Área | O que controla |
|---|---|
| `audio` | Música cinematográfica, som de cenário, oito falas e durações medidas da introdução |
| `assets` | Folhas de sprite da Morte, almas, variantes, Bruxa e fundos |
| `controls` | Andar, pular, agachar, atacar, lançar foice, rolar e pausar |
| `defaults` | Largura do mundo, chão, gravidade, câmera e ondas padrão |
| `player` | Vida, velocidade, pulo duplo, rolamento, arremesso e combos |
| `enemyAI` | Agressividade, distância de ataque, poderes e cooldowns dos NPCs |
| `difficulty` | Crescimento de vida, velocidade, dano, elites e onda do Boss |
| `chapters` | História, cenários, cenas, ondas e Boss de cada capítulo |

## Criar ou alterar um capítulo

Copie um objeto dentro de `SOD_CONTENT.chapters` e atribua um novo número. `activeChapter` define qual capítulo começa após PLAY. Use `\\n` em textos para criar quebra de linha no HUD ou nas legendas.

```js
3: {
  id: 3,
  title: 'CAPÍTULO 3',
  subtitle: 'A ESTAÇÃO DOS MORTOS',
  objective: 'SIGA O ÚLTIMO SINAL\\nNÃO OLHE PARA TRÁS',
  world: {
    background: './assets/world-03-station.png',
    accent: '#d488ff',
    fog: '#5f5788',
    layers: []
  },
  intro: [],
  waves: {
    total: 50,
    baseCount: 3,
    maxCount: 14,
    spawnGap: 150,
    intermission: 1.3,
    variants: []
  },
  boss: null
}
```

Para medir uma voz nova antes de editar a cena, execute `python3 scripts/inspect-cinematic-media.py`. Para criar uma cinematics, acrescente objetos em `intro` com `label`, `image`, `caption`, `voice`, `duration`, `effect` e `particles`. O índice `voice` aponta para a posição do arquivo em `audio.voices`, começando em zero. `audio.voiceDurations` deve conter a duração real de cada WAV em segundos e `audio.holdAfterVoice` define o respiro final. O motor usa o maior valor entre `duration` e **duração da voz + respiro**, portanto uma fala nunca é cortada por um timeout menor. A troca de plano usa dois layers com crossfade, e a interface exibe pan/zoom, letterbox, partículas, selo de cena e barra de progresso automaticamente.

## Combate do jogador

Os controles atuais são **A/D** para andar, **W** para pular, **S** para agachar, **K** para atacar, **L** para lançar a foice em chamas, **Shift** para rolar e **Esc** para voltar ao menu. No celular, os botões de toque devem ser associados às mesmas ações.

O ataque K percorre os objetos de `player.combos`. O primeiro golpe é horizontal, o segundo é ascendente e o terceiro é um finalizador. Se K for usado agachado, o motor usa `player.crouchCombo`, criando o gancho rasteiro. Se K for usado no ar, usa `player.airCombo`, criando o corte aéreo. O intervalo permitido para encadear golpes está em `comboWindow`.

A habilidade L cria um projétil de foice com velocidade, gravidade, dano, dano de chama e tempo de retorno configurados em `throwScythe`, `throwSpeed`, `throwGravity`, `throwDamage`, `throwFlameDamage` e `throwReturnTime`. O rolamento usa `rollSpeed`, `rollDuration`, `rollCooldown` e `rollInvulnerable`. O pulo duplo usa `maxJumps` e `doubleJumpVelocity`.

## NPCs e IA

Cada variante em `waves.variants` define o sprite, vida, velocidade, dano, tamanho, primeira onda e peso de aparição. Os NPCs continuam perseguindo a Morte mesmo quando ela fica parada. A distância de parada, o raio de agressividade, a separação entre inimigos, o atraso de pressão e os cooldowns ficam em `enemyAI`.

Cada comportamento pode ter um poder em `enemyAI.behaviors`. Wisp usa dash, Shade usa blink, Soul usa burst e Harbinger usa shockwave. O motor cria telemetria visual por partículas e efeitos sonoros para cada poder.

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

## Dificuldade e onda 50

O valor `waves.total` define quantas ondas são necessárias para avançar. A dificuldade cresce usando `difficulty.hpPerWave`, `speedPerWave` e `damagePerWave`. A quantidade de inimigos cresce em `countEveryWaves`; elites entram conforme `eliteEveryWaves`. A onda indicada por `bossWave` reserva a arena para o Boss.

Na configuração atual, a onda 50 apresenta **A BRUXA DO VÉU**, com 420 pontos de vida, arena própria, barra de vida, fases por percentual de vida e quatro poderes: ataque de garras, chuva de fogo, teleporte e três orbes espectrais. Para trocar o Boss, edite somente o bloco `boss` do capítulo e forneça uma folha de sprite compatível.

## Assets e transparência

Folhas de personagem devem ter fundo transparente real e grade consistente. A Morte usa uma grade 4×3; as almas e a Bruxa usam uma grade 4×2 por padrão. O motor usa a âncora inferior da célula para compensar margens internas diferentes entre frames. O arquivo `ASSETS.md` registra o uso de cada asset.

Ao adicionar um caminho novo, inclua-o em `sw.js` dentro de `APP_SHELL` para disponibilizar o conteúdo no cache offline. Depois execute `npm run build` para copiar o arquivo para `www/`.

## Verificação antes de publicar

Execute a validação mínima antes de cada push:

```bash
npm run build
awk '/<script>/{f=1;next}/<\\/script>/{f=0}f' index.html > /tmp/side-of-death.js
node --check /tmp/side-of-death.js
node --check chapters.js
git diff --check
```

Abra o jogo em landscape e confirme o caminho **menu → PLAY → sangue → cinematics → Capítulo 1 → gameplay**. Teste idle, corrida, pulo duplo, agachamento, ataque normal, combo, gancho rasteiro, corte aéreo, rolamento, foice lançada e ataque de poder dos NPCs. Nas ondas 48–50, confirme aviso, arena e Boss. Na web, confirme que `document.fullscreenElement` permanece vazio: o jogo não chama mais `requestFullscreen`, evitando a bolha nativa do navegador que instrui o usuário a arrastar para sair da tela cheia. A orientação horizontal continua sendo aplicada pelo wrapper nativo e a instrução de rotação permanece para portrait.

Para testar a Bruxa sem atravessar manualmente as 49 ondas, abra localmente `http://localhost:4173/?debugboss=1`. Esse modo de QA é ativado somente pela query string, inicia a arena da onda 50 e expõe comandos internos de diagnóstico no console do navegador; ele não aparece no menu nem altera a experiência normal. Os controles de toque esperados são `a`, `d`, `s`, `w`, `k`, `l` e `shift`.

## Publicação web e nativa

O Vercel publica o branch `main`. O Android usa `applicationId` `com.klipzastudio.sideofdeath`, orientação horizontal e release assinado por um keystore privado. Para gerar o AAB:

```bash
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

O iOS é sincronizado pelo Capacitor e precisa ser aberto no Xcode em um Mac para assinatura, archive e envio ao App Store Connect. O repositório não deve conter keystore, senhas, credenciais nem AABs.

## Limitações importantes

O navegador e o Capacitor usam o mesmo `www`. A publicação Android pode ser compilada no ambiente Linux; a assinatura e o archive iOS dependem de Xcode e da conta Apple. Alterações de conteúdo não exigem IA nem assistência, mas uma mecânica totalmente nova pode exigir uma edição planejada no motor de `index.html`.

## Licença de música

A música do menu é `assets/metalmania.mp3`, de Kevin MacLeod, licenciada sob Creative Commons Attribution 4.0. Mantenha o crédito existente em `PUBLISHING.md` ao distribuir o jogo.
