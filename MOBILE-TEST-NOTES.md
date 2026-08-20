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
