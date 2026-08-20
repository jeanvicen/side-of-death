# SIDE OF DEATH — instalação e publicação

## O que foi preparado

O projeto agora funciona como uma aplicação web instalável (PWA) e possui configuração Capacitor para gerar o projeto Android e o projeto iOS a partir da mesma pasta `www`. O HTML continua sendo a entrada única do jogo; o menu original não foi remodelado.

O navegador pode promover a instalação quando a aplicação é servida por HTTPS ou `localhost`, porque o projeto possui manifesto, ícones nos tamanhos exigidos e `display: standalone`. O jogo foi configurado para **orientação horizontal/deitada** no PWA, Android e iOS; se o aparelho estiver em pé, aparece uma instrução para girá-lo. Em navegadores Chromium, o aviso de instalação estilizado em sangue usa o evento `beforeinstallprompt`; em navegadores que não oferecem esse evento, a mesma notificação permanece visível e orienta a instalação pelo menu do navegador. No iOS, a instalação pelo navegador segue o fluxo de “Adicionar à Tela de Início” do Safari/Chrome.

## Rodar localmente

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:4173`. Para testar o conteúdo final exatamente como seria empacotado:

```bash
npm run build
npm run preview
```

A instalação PWA precisa de HTTPS em produção. O domínio publicado no Vercel já atende essa condição.

## Android: APK de teste e AAB para Google Play

Instale as dependências do projeto e crie a plataforma Android uma única vez:

```bash
npm install
npx cap add android
npm run cap:sync
```

Abra o projeto no Android Studio:

```bash
npm run cap:open:android
```

Para testar em um aparelho ou emulador, use o Android Studio. Para distribuição, configure no Android Studio o `applicationId` `com.klipzastudio.sideofdeath`, o nome `SIDE OF DEATH`, o ícone adaptativo e uma chave de assinatura privada. A configuração Capacitor está orientada para `AAB`, que é o formato recomendado para a Google Play; um APK pode ser gerado para testes ou distribuição fora da loja alterando temporariamente `releaseType` para `APK` ou usando as tarefas de build do Android Studio.

A chave de assinatura não fica no repositório. Ela deve ser criada e armazenada pelo responsável pela conta Google Play. Perder essa chave pode impedir atualizações futuras do aplicativo.

## iOS: projeto para App Store

Em um Mac com Xcode e uma conta Apple Developer:

```bash
npm install
npx cap add ios
npm run cap:sync
npm run cap:open:ios
```

No Xcode, selecione o time de desenvolvimento, confirme o Bundle Identifier `com.klipzastudio.sideofdeath`, configure ícones e certificados e então archive para o App Store Connect. O arquivo `capacitor.config.json` já desativa rolagem e mantém o fundo preto; assinatura, provisioning profile e submissão continuam dependentes da conta Apple e do Xcode.

## Créditos da música

A faixa local `assets/metalmania.mp3` é “Metalmania”, de Kevin MacLeod (incompetech.com), licenciada sob Creative Commons Attribution 4.0. O crédito deve permanecer na descrição da loja, na página de créditos ou em um arquivo de avisos distribuído com o aplicativo:

> “Metalmania” Kevin MacLeod (incompetech.com). Licensed under Creative Commons: By Attribution 4.0 License. https://creativecommons.org/licenses/by/4.0/

A faixa não foi substituída; apenas foi armazenada localmente para o jogo tocar sem depender de uma requisição externa.

## Limitações de publicação

A configuração deixa o projeto pronto para ser aberto e compilado nas ferramentas oficiais, mas nenhuma conta de loja, certificado de assinatura, chave privada, perfil de provisionamento ou aceite de termos pode ser criado automaticamente dentro deste repositório. A publicação efetiva exige esses dados do proprietário e a revisão de cada loja.

## Referências

[1]: https://capacitorjs.com/docs/getting-started "Capacitor — Installing Capacitor"
[2]: https://capacitorjs.com/docs/config "Capacitor — Configuration"
[3]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable "MDN — Making PWAs installable"
[4]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt "MDN — Trigger installation from your PWA"
[5]: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700023&Search=Search "incompetech — Metalmania"
[6]: https://creativecommons.org/licenses/by/4.0/ "Creative Commons — Attribution 4.0 International"


## Verificação da correção horizontal e do áudio

A correção publicada no commit `2dcd70b` foi validada no domínio Vercel. A deployment correspondente concluiu com sucesso, o aviso `INSTALAR SIDE OF DEATH` aparece no carregamento e o menu original permanece presente. O PWA e os projetos nativos declaram orientação horizontal; a reprodução do MP3 local foi validada em navegador após o primeiro gesto.
