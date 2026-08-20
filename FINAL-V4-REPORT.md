# Side of Death — relatório final v4.0.0

## Resultado da entrega

A expansão foi concluída, testada localmente, sincronizada com Capacitor, publicada no GitHub/Vercel e empacotada em AAB Android. O menu principal permanece com os textos, botões e aparência originais; o reset foi colocado dentro de SETTINGS, sem adicionar um botão ao menu principal.

| Item | Resultado |
|---|---|
| Site público | https://side-of-death.vercel.app/?v4=1 |
| Repositório | https://github.com/jeanvicen/side-of-death |
| Commit de gameplay v4 | `3b63325a79c9c753532b99dc86260d03fc973ca6` |
| Commit final de documentação | `775d5d9eabf7bdd9053e22c50ea32f833cedc8b6` |
| Deployment público v4 | https://side-of-death-d1sda7no5-jeanvicens-projects.vercel.app |
| Versão de conteúdo | `4.0.0` |
| Service worker | `side-of-death-v9` |
| AAB Android | `android/app/build/outputs/bundle/release/app-release.aab` |
| SHA-256 do AAB | `dd25b1eae49ee72620e63e6d34f32b382d0e9f7aa6bfa31807d94f05c6bc6bed` |

## O que foi acrescentado

A primeira fase agora funciona como uma sequência de cidades-fantasma em mapa horizontal. Cada cidade corresponde a uma onda. Os fantasmas precisam ser derrotados, as casas podem ser exorcizadas, os baús podem ser explorados e o portão da direita só abre quando a cidade está libertada. O jogador caminha até o portão para avançar manualmente para a próxima cidade; não existe mais uma troca automática imediata após a eliminação dos inimigos.

As cidades incluem casas procedurais com janelas, portas, animações de luz e atmosfera, além de baús com três tipos de recompensa. `fragment` concede fragmentos de espíritos, `heal` restaura a vitalidade e `life` concede uma vida extra até o limite configurado. A estrutura é editável em `chapters.js`, sem precisar de um PNG diferente para cada cidade.

A Morte começa com cinco vidas. Quando a vitalidade chega a zero, uma vida é consumida e o jogador retorna ao checkpoint da cidade. Ao perder todas as vidas, o jogo para e apresenta a tela `A MORTE FOI SILENCIADA`; o botão `RECOMEÇAR CIDADE` restaura as cinco vidas sem apagar fragmentos ou baús. O salvamento automático registra cidade, checkpoint, vidas, fragmentos, casas, baús, motivo e timestamp em `localStorage`.

O botão `RESETAR PROGRESSO` foi adicionado somente dentro de SETTINGS. Ele exige confirmação e apaga a campanha local: cidade, checkpoint, vidas, fragmentos, casas e baús. A cinematics v3.1, o crossfade, a correção de timing das falas, o combate avançado, a foice, os combos, a IA dos NPCs e a Bruxa da onda 50 continuam integrados.

## Validações realizadas

| Teste | Resultado |
|---|---|
| `npm run build` | Aprovado |
| Sintaxe de `index.html` e `chapters.js` | Aprovada com `node --check` |
| `git diff --check` | Aprovado |
| Capacitor Android/iOS | Sincronizado |
| Menu normal | PLAY e SETTINGS intactos; `SOD_DEBUG` ausente |
| Cidade 1 | HUD, casas, baús e portão carregados |
| Baú de fragmento | Fragmentos e exploração atualizados; autosave persistido |
| Baú de vida | Vida extra concedida até o limite configurado |
| Casa | `S+K` exorcizou a casa e concedeu fragmento |
| Portão | Abriu após eliminar a cidade; cidade 2 carregou ao atravessar |
| Cinco vidas | Última perda abriu overlay e salvou `lives: 0` |
| Recomeçar cidade | Restaurou cinco vidas e manteve coleta da campanha |
| Reset | Zerou cidade, fragmentos, baús, casas e checkpoint em SETTINGS |
| Domínio público | Conteúdo `4.0.0`, service worker v9 e cinematics CENA 01 confirmados |
| Fullscreen web | `document.fullscreenElement` permaneceu vazio; nenhum pedido programático |

O modo de QA local `?debugcity=1` expõe `SOD_DEBUG.state()`, `moveToChest(id)`, `openChest()`, `moveToHouse(id)`, `exorciseHouse()`, `clearCity()`, `advanceCity()`, `loseLife()`, `save()` e `reset()`. O modo `?debugboss=1` continua disponível para a Bruxa.

## Como atualizar sem IA

Edite `chapters.js` para alterar nomes das cidades, número de casas, número de baús, recompensas, vidas, nomes, cenários e parâmetros de progressão. Para uma nova voz, use `python3 scripts/inspect-cinematic-media.py`, atualize `audio.voiceDurations` e mantenha `audio.holdAfterVoice` como margem. Depois execute `npm run build`; para Android/iOS execute `npx cap sync`; para a web faça commit e push em `main`.

Os arquivos de manutenção são `README.md`, `CHAPTERS-GUIDE.md`, `PUBLISHING.md`, `CARRION-DESIGN-RESEARCH.md`, `GROWTH-PLAN-RESEARCH.md`, `ASSETS.md` e `MOBILE-TEST-NOTES.md`.

## O que pode tornar o jogo conhecido

A recomendação principal é não tentar crescer apenas publicando o link. O jogo precisa de uma promessa simples e demonstrável: **“liberte cidades-fantasma, abra baús, sobreviva a cinco vidas e enfrente a Bruxa do Véu.”** Cada vídeo deve mostrar um acontecimento legível em poucos segundos: a foice voltando em chamas, um baú concedendo vida, uma casa sendo exorcizada, o portão abrindo ou a Bruxa aparecendo.

A segunda prioridade é criar uma demo curta e polida. Para uma futura versão de Steam, uma demo com uma cinematics, uma cidade, uma casa, dois baús e um mini-Boss comunica o jogo melhor do que obrigar a pessoa a atravessar 50 ondas. O Steam Next Fest é descrito oficialmente como um evento baseado em demos jogáveis, exposição a fãs e feedback em tempo real; a página pública do jogo e a demo são requisitos de elegibilidade.[1]

Na Google Play, a própria orientação de destaque enfatiza quatro pilares: valor central, experiência do usuário, qualidade técnica e privacidade/segurança. Para este jogo, isso significa onboarding curto, controles móveis claros, carregamento confiável, orientação horizontal consistente, screenshots honestas, descrição localizada e atenção a Android Vitals. A orientação também relaciona a qualidade de um jogo à integração de animação, arte, áudio, história, mundo e mecânicas.[2]

| Horizonte | Ação recomendada | Sinal de sucesso |
|---|---|---|
| Próximos 7 dias | Publicar 5 vídeos verticais com foice, baú, casa, portão e Bruxa | Retenção dos primeiros segundos e cliques no jogo |
| Próximas 2 semanas | Criar página de apresentação com trailer real, screenshots e link direto | Aumento de visitas e início de sessões |
| Próximo mês | Fazer teste fechado com jogadores de horror/indie e registrar abandono por etapa | Mais pessoas chegando à primeira cidade e ao primeiro baú |
| Após polimento | Enviar build para criadores pequenos, com pitch e instruções simples | Vídeos espontâneos e feedback reproduzível |
| Fase Steam | Preparar página pública, demo e participação em um único Next Fest | Wishlists, downloads da demo e feedback |
| Crescimento contínuo | Atualizar uma cidade, segredo ou desafio por ciclo e publicar changelog | Retorno de jogadores e comunidade ativa |

Não recomendo comprar avaliações, usar divulgação artificial ou inserir anúncios antes de a experiência principal estar estável. Uma comunidade pequena, transparente e participativa — com changelogs, enquetes de nomes de cidades, testes fechados e respostas rápidas a bugs — tende a construir confiança melhor do que volume artificial.

### Referências

[1]: https://partner.steamgames.com/doc/marketing/upcoming_events/nextfest "Steamworks — Steam Next Fest"

[2]: https://play.google.com/console/about/guides/featuring/ "Google Play Console — Getting featured on Google Play"
