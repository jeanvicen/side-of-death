# Side of Death — relatório da expansão v5.0.0

## Resultado

A v5 corrige a leitura visual da fase e reorganiza a experiência em arenas de combate horizontais. O menu principal e a cinematics existente foram preservados. A camada de casas foi removida do gameplay; o jogador agora percorre arenas com cristais, caches cristalinos, drops, NPCs visíveis e um portão de transição.

## Correções principais

As folhas de sprite apresentavam contaminação verde residual e os NPCs não recebiam `sheetImg` no objeto de spawn. Foram criadas versões `*-clean.png`, o alpha foi limpo de forma determinística e o spawn passou a carregar a folha real de cada variante. O renderizador também possui fallback legível enquanto uma imagem ainda carrega, contorno luminoso e escala visual consistente.

O motor v5 usa quatro referências de cenário no ciclo editável: o palco do cemitério, a nova arena de cristais, a cidade sob o véu e a arena ritual da Bruxa. Cristais decorativos, caches, drops e portão são desenhados proceduralmente para manter a leitura dos personagens e evitar depender de uma casa em cada mapa.

Os caches podem conceder fragmentos, cura, fúria ou vida extra. Inimigos podem derrubar fragmentos, cura ou fúria conforme `dropChance` e `dropRewards`. O salvamento usa a chave `sod_progress_v5`, com progresso v2, e o reset em SETTINGS apaga arenas, caches, fragmentos, checkpoint e vidas sem alterar o menu.

A nova barra de fúria é alimentada por golpes e eliminações. Ao chegar a 100%, a Morte entra em `rageActive` por duração configurável, cresce visualmente, recebe aura, aumenta o dano e lança uma foice maior e mais forte. A ativação mostra uma única cinematics; ao acabar, o overlay é removido, `aria-hidden` volta a `true` e o retorno ao normal não mostra outra cinematics.

Os controles de toque foram ampliados, receberam fundo semitransparente, borda legível e rótulos individuais. A legenda explica A/D, W, S, K, L e rolar. No ambiente de teste emulado, os sete botões mediram 86×78 px, com fundo `rgba(10,3,14,.48)` e rótulos claros.

## Validações

| Teste | Resultado |
|---|---|
| Build e sintaxe | `npm run build`, `node --check` do motor e `chapters.js` passaram |
| Diff | `git diff --check` passou |
| Menu | PLAY e SETTINGS continuam intactos |
| NPCs | Jogador, almas e sprites limpos aparecem no canvas |
| Arena | Nenhuma casa é desenhada; cristais e caches aparecem |
| Cache | Abrir o primeiro cache concedeu fragmento e persistiu em localStorage |
| Portão | Limpar a arena abriu o portão e carregou CATACUMBAS DA LUA |
| Fúria | Barra encheu, overlay apareceu, estado ampliado ativou e terminou com overlay oculto |
| Retorno | `rageActive:false`, `rage:0`, `display:none`, `aria-hidden:true` após a duração |
| Mobile | Sete controles grandes, translúcidos, rotulados e com legenda |
| Cache offline | Service worker avançado para `side-of-death-v10` |

## Manutenção

Edite `chapters.js` para alterar nomes das arenas, ciclo de cenários, quantidade de caches, recompensas, drops, vidas, fúria, ondas, NPCs e Boss. Execute `npm run build`, abra o modo local `?debugcity=1`, use `SOD_DEBUG.fillRage()` para testar a transformação e faça commit/push no branch `main`. O script `scripts/clean-sprite-alpha.py` pode ser executado novamente se novas folhas com chroma residual forem adicionadas.

## Arquivos centrais

`index.html` contém o motor; `chapters.js` é o arquivo de conteúdo; `sw.js` controla o cache; `README.md` e `CHAPTERS-GUIDE.md` explicam a manutenção; `ASSETS.md` registra os novos assets; `MOBILE-TEST-NOTES.md` contém o histórico detalhado de QA.
