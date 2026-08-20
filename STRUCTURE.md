# Estrutura da expansão

O projeto continuará como uma experiência estática em `index.html`, preservando o menu atual. A nova camada será organizada em máquinas de estado independentes:

- `MENU`: experiência original, sem alteração visual.
- `CINEMATIC`: planos narrativos, arte, legendas, voz, trilha e skip.
- `CHAPTER_CARD`: letreiro “CAPÍTULO 1”.
- `GAMEPLAY`: cenário horizontal, jogador, almas, partículas, HUD e controles.
- `PAUSE/RETURN`: pausa e retorno ao menu.

A renderização da fase usará um canvas 2D pixelado sobre o cenário existente, com sprites gerados em PNG, colisões retangulares e física simples de plataforma. A camada cinematográfica usará DOM/CSS para controlar fades, letterbox, movimento de câmera e legendas. Os assets grandes ficarão locais para o pacote atual, com nomes versionados e cache atualizado.

O áudio usará elementos `<audio>` locais para trilha e voz e Web Audio para impactos, golpes, passos e ambientes. O primeiro gesto do usuário desbloqueará todos os canais; a sequência cinematográfica poderá ser pulada sem perder a entrada na fase.
