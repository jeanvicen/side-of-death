# Inventário de assets da expansão

## Arte de referência

A direção visual será pixel-art gótica cinematográfica: roxos quase pretos, vermelho de sangue, lua carmesim, neblina azul-acinzentada, silhuetas recortadas e alto contraste. A câmera da introdução alternará planos largos, planos médios da caveira e closes da foice.

## Assets a gerar

| ID | Asset | Uso | Requisito |
|---|---|---|---|
| CINE-01 | Plano cinematográfico do cemitério | Abertura | Paisagem, sem texto, espaço central para legenda |
| CINE-02 | Plano das almas fugitivas | Perseguição | Paisagem, almas pálidas e rastros espectrais |
| CINE-03 | Portal rachado entre mundos | Clímax | Paisagem, centro luminoso e silhueta da Morte |
| PLAYER-01 | Sprite sheet da Morte | Gameplay | Transparente, pixel-art 2D, idle/run/jump/crouch/attack/hurt |
| ENEMY-01 | Sprite sheet de alma fugitiva | Gameplay | Transparente, flutuação/ataque/dano/morte |
| WORLD-01 | Fundo de fase | Gameplay | Paisagem, cemitério respirando, camadas para parallax |
| FX-01 | Partículas e impactos | Gameplay | Transparente, sangue e energia espectral |
| CARD-01 | Arte do letreiro Capítulo 1 | Transição | Fundo escuro e área central para texto gerado no DOM |

O jogo manterá os assets existentes do menu. As imagens cinematográficas e sprites serão gerados em estilo consistente, validados visualmente e registrados neste arquivo com seus caminhos finais.

## Caminhos gerados

Os planos e fundos gerados nesta etapa estão em `assets/cine-01-cemetery.png`, `assets/cine-02-fugitive-souls.png`, `assets/cine-03-portal.png`, `assets/world-01-stage.png`, `assets/card-01-chapter.png` e `assets/cinematic_ref.png`. Todos foram produzidos em 2560×1440 e serão exibidos responsivamente em 16:9.

Os sprites foram gerados em 1920×1920 com canal alfa: `assets/player-01-reaper-sheet.png`, `assets/enemy-01-soul-sheet.png`, `assets/enemy-02-shade-sheet.png`, `assets/enemy-03-harbinger-sheet.png` e `assets/fx-01-combat-effects.png`. A Morte usa uma grade 4×3, cada alma usa uma grade 4×2 e os efeitos usam uma grade 4×3.

## Assets v2

A cinematics agora também usa `assets/cine-04-reaper-gate.png` e `assets/cine-05-souls-gate.png`, com pan/zoom, letterbox, partículas e efeitos sonoros por cena. O primeiro capítulo usa `assets/world-01-stage.png`; o segundo cenário está em `assets/world-02-city-under-veil.png`. A camada `assets/world-01-foreground.png` foi mantida como referência, mas não é aplicada enquanto não possuir alpha limpo.

A voz natural está em oito arquivos `assets/voice-cine-01.wav` a `assets/voice-cine-08.wav`. A ambiência procedural de cemitério, com vento, sinos distantes, sussurros e pulsos de portal, está em `assets/cemetery-ambience.wav`.

## Assets v3 — Boss da onda 50

A Bruxa usa `assets/boss-01-witch-sheet.png`, folha 4×2 com oito estados: idle, invocação, ataque, chuva de fogo, teleporte, dano, enfurecida e derrota. O fundo gerado originalmente com chroma foi limpo para alpha real antes da integração. A arena final é `assets/world-03-witch-arena.png`, um círculo ritual em ruínas usado quando a onda 50 começa.

## Assets v5 — arenas, cristais e sprites legíveis

A expansão v5 removeu casas, janelas e portas do gameplay. Cada cidade agora usa uma arena horizontal com cristais decorativos, caches cristalinos interativos, drops luminosos, portão do véu e espaço livre para o jogador e os NPCs. Esses elementos são desenhados proceduralmente no canvas e podem ser combinados com `exploration.scenarioCycle` em `chapters.js`.

A referência visual adicional da arena está em `assets/arena-crystal-reference.png`. As folhas usadas pelo motor são as versões com alpha limpo: `assets/player-01-reaper-sheet-clean.png`, `assets/enemy-01-soul-sheet-clean.png`, `assets/enemy-02-shade-sheet-clean.png`, `assets/enemy-03-harbinger-sheet-clean.png` e `assets/boss-01-witch-sheet-clean.png`. O script `scripts/clean-sprite-alpha.py` documenta a limpeza determinística do chroma residual dos exports originais.

A pesquisa de referência e as decisões de design estão em `CARRION-DESIGN-RESEARCH.md`. Nenhum asset, personagem, nome ou identidade visual de CARRION foi reutilizado.
