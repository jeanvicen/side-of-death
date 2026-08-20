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

Os sprites foram gerados em 1920×1920 com canal alfa: `assets/player-01-reaper-sheet.png`, `assets/enemy-01-soul-sheet.png` e `assets/fx-01-combat-effects.png`. A Morte usa uma grade 4×3, a alma usa uma grade 4×2 e os efeitos usam uma grade 4×3.
