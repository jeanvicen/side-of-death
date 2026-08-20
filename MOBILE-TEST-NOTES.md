# Teste da versão pública em viewport móvel

A deployment pública `?mobiletest=0c369d0` carregou a introdução e, após aguardar, exibiu o menu horizontal PLAY/SETTINGS. Nenhum aviso de instalação ou painel do site apareceu. A arte, o ceifador e o menu visual correspondem à correção enviada no commit `0c369d0`.


No domínio público, o clique real em PLAY abriu a tela EM BREVE. No instante inicial, a camada `#bloodBurst` ficou com classe `go` e `display: block`, e o painel de instalação não existia. Após aguardar 1,8 s, o MP3 local chegou a `readyState: 4`, ficou `paused: false`, com `currentTime: 12.766353` e volume `0.82`; a tela EM BREVE estava visível. Isso confirma que o gesto desbloqueia e inicia a música no fluxo público.

## Expansão local — 20/08/2026

A versão local carregou o menu original sem alteração visual aparente. PLAY executou o corte de sangue e abriu a introdução com os planos de cemitério, almas fugitivas, legendas em português e o controle PULAR INTRO. O botão levou ao letreiro “CAPÍTULO 1 — O CEMITÉRIO QUE RESPIRA”; depois de aproximadamente 4,7 segundos, o canvas exibiu a primeira fase com HUD, controles A/D/W/S/K, almas inimigas e cenário horizontal pixel-art.

O teste de K mostrou a animação de ataque da foice, dano visível na alma e partículas vermelhas/ciano. O teste DOM confirmou `#gameExit` com `pointer-events: auto`; o retorno pelo botão MENU escondeu `#gameShell` e reativou a classe visual do menu. O build e o sync do Capacitor concluíram sem erro, e o service worker foi atualizado para `side-of-death-v5` com os novos arquivos locais.
