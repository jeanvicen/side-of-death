# Teste da versão pública em viewport móvel

A deployment pública `?mobiletest=0c369d0` carregou a introdução e, após aguardar, exibiu o menu horizontal PLAY/SETTINGS. Nenhum aviso de instalação ou painel do site apareceu. A arte, o ceifador e o menu visual correspondem à correção enviada no commit `0c369d0`.


No domínio público, o clique real em PLAY abriu a tela EM BREVE. No instante inicial, a camada `#bloodBurst` ficou com classe `go` e `display: block`, e o painel de instalação não existia. Após aguardar 1,8 s, o MP3 local chegou a `readyState: 4`, ficou `paused: false`, com `currentTime: 12.766353` e volume `0.82`; a tela EM BREVE estava visível. Isso confirma que o gesto desbloqueia e inicia a música no fluxo público.

## Expansão local — 20/08/2026

A versão local carregou o menu original sem alteração visual aparente. PLAY executou o corte de sangue e abriu a introdução com os planos de cemitério, almas fugitivas, legendas em português e o controle PULAR INTRO. O botão levou ao letreiro “CAPÍTULO 1 — O CEMITÉRIO QUE RESPIRA”; depois de aproximadamente 4,7 segundos, o canvas exibiu a primeira fase com HUD, controles A/D/W/S/K, almas inimigas e cenário horizontal pixel-art.

O teste de K mostrou a animação de ataque da foice, dano visível na alma e partículas vermelhas/ciano. O teste DOM confirmou `#gameExit` com `pointer-events: auto`; o retorno pelo botão MENU escondeu `#gameShell` e reativou a classe visual do menu. O build e o sync do Capacitor concluíram sem erro, e o service worker foi atualizado para `side-of-death-v5` com os novos arquivos locais.

## Verificação pública do commit a8990fb

O GitHub registrou o deployment de produção do commit `a8990fb` como concluído com sucesso. Após um cache-busting no domínio público, PLAY abriu a cinematics nova com plano largo do cemitério, lua carmesim, letterbox, legenda em duas linhas e botão PULAR INTRO. O domínio público não apresentou mais o fluxo EM BREVE como destino do botão; o texto antigo permanece apenas no markup oculto do modal preservado do menu.

## Expansão v2 local — 20/08/2026

O menu original continuou visualmente preservado. A nova cinematics mostrou movimento de câmera com zoom/pan, letterbox, atmosfera, partículas e planos adicionais do portal e do portão. A voz regenerada foi carregada a partir de oito clipes em português brasileiro, com o texto de atuação separado do texto falado. O cenário da fase passou a ser repetido em tiles 16:9, evitando o estiramento horizontal da versão anterior.

A primeira onda exibiu a Morte e duas almas com o HUD de vitalidade, objetivo e controles. A tecla D moveu o personagem; K acionou a foice, produziu partículas de impacto e avançou a eliminação da alma. A progressão agora está configurada para 50 ondas e libera `PRÓXIMO CAPÍTULO` ao final. O botão MENU continua visível e separado do controle de avanço.

## Verificação pública v2 — commit 0f4fd91

O deployment de produção do commit `0f4fd91` foi concluído com sucesso. No domínio público, o menu original apareceu sem alteração e PLAY abriu a cinematics atualizada com almas em movimento visual, pan/zoom, letterbox, legenda em duas linhas e `PULAR INTRO`. Os novos assets chegaram ao deploy e o arquivo central `chapters.js` está sendo servido pela mesma origem.

## Correção de apoio dos sprites — commit e8f0276

O deploy público do commit `e8f0276` preservou o menu e abriu a cinematics normalmente. A correção aplica uma âncora inferior por estado/variante, reduz a flutuação das almas e mantém a sombra na linha física do chão durante idle, corrida e ataque. A verificação pública mostrou a Morte e as almas da primeira onda apoiadas na mesma base visual do cenário.

## Gameplay v3 — teste inicial

A versão local v3 carregou o menu original sem alterações visuais. O build passou na validação de sintaxe e o fluxo de abertura permanece disponível antes do teste de combate, Boss e habilidades.
A fase v3 abriu localmente com `K COMBO`, `S+K GANCHO`, `W+K CORTE AÉREO`, `L FOICE DE FOGO` e `SHIFT ROLAMENTO` visíveis no HUD. O canvas iniciou em landscape com a barra de Boss oculta até a onda 50.
No teste v3, o HUD exibiu `PODER DA ALMA · DASH` enquanto a Morte permanecia na arena, confirmando que o NPC não fica parado esperando o jogador. A tecla W iniciou o salto e manteve a fase estável; o segundo salto será validado junto com os ataques contextuais.
A segunda pressão de W levou a Morte ao ar novamente, confirmando o pulo duplo visual. K no ar deixou a Morte em pose de corte aéreo e a fase continuou estável. O próximo teste cobre `S+K`, `L` e `Shift`.
O teste `S + K` acionou o ataque agachado/gancho rasteiro sem quebrar a física. Durante o mesmo período, a IA exibiu novamente `PODER DA ALMA · DASH`, mantendo os NPCs ativos enquanto o jogador alternava entre parado e agachado.
`L` acionou a habilidade da foice lançada e `Shift` acionou o rolamento com impulso, sem travar o canvas ou o HUD. A Morte permaneceu apoiada no chão após a sequência.
O modo local `?debugboss=1` abriu a onda 50 diretamente: `boss: true`, `wave: 50`, `bossHp: 420`, `playerHp: 100`. A arena e a barra de Boss iniciaram sem erro de script.
A captura da onda 50 mostrou a arena ritual, a Bruxa em escala de Boss, a barra `BOSS · ONDA 50` e o nome `A BRUXA DO VÉU`. Após 5,2 segundos de simulação, o estado reportou `boss: true`, `bossHp: 420` e `playerHp: 64`, confirmando que a luta está ativa e que os ataques/perigos causam dano ao jogador.
No primeiro teste contra a Bruxa, L foi acionado mas a foice retornou antes de alcançar o Boss quando ele estava distante. A correção foi feita somente em `chapters.js`, aumentando `throwReturnTime` de 0,78 para 1,25 segundo, mantendo a habilidade totalmente editável.
No segundo teste, a foice apareceu visualmente na arena e retornou, mas a barra da Bruxa permaneceu em 420 porque o Boss estava além da distância coberta pela trajetória atual. O alcance será ampliado novamente para tornar o arremesso confiável em toda a arena.
No terceiro teste, a Bruxa continuou em 420 e o estado voltou com `projectiles: 0` após L, indicando que a habilidade não ficou registrada no motor durante essa tentativa. Será feito um diagnóstico local do input antes de alterar mais parâmetros.
O diagnóstico direto confirmou a habilidade: após o disparo, `projectiles: 1` e `throwing: 2.4`; depois da travessia, a Bruxa caiu de 420 para 368, `projectiles: 0`, `throwing: 0` e `hazards: 7`. A foice agora atinge o Boss e retorna corretamente, enquanto a Bruxa mantém sete perigos de fogo/orbes ativos.
