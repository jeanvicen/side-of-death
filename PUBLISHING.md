# SIDE OF DEATH — instalação e publicação

## O que foi preparado

O projeto agora funciona como uma aplicação web instalável (PWA) e possui configuração Capacitor para gerar o projeto Android e o projeto iOS a partir da mesma pasta `www`. O HTML continua sendo o motor visual principal e o menu original não foi remodelado. O conteúdo de capítulos, cenas, falas, assets, configurações de física e composição das ondas fica centralizado em `chapters.js`; consulte `CHAPTERS-GUIDE.md` antes de criar novas fases.

O projeto possui manifesto, ícones e `display: standalone` para permitir instalação pelo fluxo nativo do navegador quando o usuário escolher essa opção. **Nenhum painel ou aviso de instalação é exibido dentro do jogo.** A versão web também não chama `requestFullscreen`, evitando a bolha do navegador que instrui o usuário a arrastar para sair da tela cheia. O jogo foi configurado para **orientação horizontal/deitada** no PWA, Android e iOS; se o aparelho estiver em pé, aparece uma instrução para girá-lo. No iOS, a instalação pelo navegador segue o fluxo de “Adicionar à Tela de Início” do Safari/Chrome.

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

Uma chave de upload foi gerada para esta entrega. O keystore e o arquivo de credenciais são entregues separadamente e **não foram enviados ao GitHub**. O arquivo local ignorado `android/keystore.properties` aponta para o keystore e configura automaticamente o `release` do Gradle. Para recompilar depois de copiar o keystore para um novo computador, preencha esse arquivo conforme `android/keystore.properties.example` e execute:

```bash
npm run build
npx cap sync android
cd android
./gradlew bundleRelease
```

Não altere o alias nem perca a senha do keystore. A mesma chave de upload deve ser preservada para as próximas atualizações do aplicativo. No primeiro envio, ative o Google Play App Signing no Play Console e use o AAB assinado entregue nesta tarefa.

## iOS: projeto para App Store

Em um Mac com Xcode e uma conta Apple Developer:

```bash
npm install
npx cap add ios
npm run cap:sync
npm run cap:open:ios
```

No Xcode, selecione o time de desenvolvimento, confirme o Bundle Identifier `com.klipzastudio.sideofdeath`, configure ícones e certificados e então archive para o App Store Connect. O arquivo `capacitor.config.json` já desativa rolagem e mantém o fundo preto; assinatura, provisioning profile e submissão continuam dependentes da conta Apple e do Xcode.

## Atualização por capítulos

Edite `chapters.js` para trocar textos, cenas, vozes, cenários, variantes de NPC e o número de ondas. Para cenas com narração, atualize também `audio.voiceDurations` com a duração real dos WAVs e mantenha `audio.holdAfterVoice` como margem de respiro; o motor nunca troca de plano antes do fim da voz. O Capítulo 1 está configurado com 50 ondas; ao concluir a última, o jogo exibe `PRÓXIMO CAPÍTULO` e carrega o cenário definido no próximo objeto de `SOD_CONTENT.chapters`. Depois de qualquer alteração, execute `npm run build` e, para pacotes nativos, `npx cap sync`.

## Créditos da música

A faixa local `assets/metalmania.mp3` é “Metalmania”, de Kevin MacLeod (incompetech.com), licenciada sob Creative Commons Attribution 4.0. O crédito deve permanecer na descrição da loja, na página de créditos ou em um arquivo de avisos distribuído com o aplicativo:

> “Metalmania” Kevin MacLeod (incompetech.com). Licensed under Creative Commons: By Attribution 4.0 License. https://creativecommons.org/licenses/by/4.0/

A faixa não foi substituída; apenas foi armazenada localmente para o jogo tocar sem depender de uma requisição externa.

## Limitações de publicação

A configuração deixa o projeto pronto para ser aberto e compilado nas ferramentas oficiais. A chave de upload desta entrega foi gerada localmente e não está no repositório; a publicação efetiva ainda exige a conta do proprietário, ativação do Play App Signing, preenchimento dos dados da loja, screenshots, classificação etária, declaração de segurança de dados e revisão da Google Play.

## Referências

[1]: https://capacitorjs.com/docs/getting-started "Capacitor — Installing Capacitor"
[2]: https://capacitorjs.com/docs/config "Capacitor — Configuration"
[3]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable "MDN — Making PWAs installable"
[4]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt "MDN — Trigger installation from your PWA"
[5]: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1700023&Search=Search "incompetech — Metalmania"
[6]: https://creativecommons.org/licenses/by/4.0/ "Creative Commons — Attribution 4.0 International"


## Verificação da correção horizontal e do áudio

A versão v2 foi validada localmente em landscape. O menu original permanece presente, a introdução usa movimento, partículas, oito falas em português e ambiência de cemitério, e o canvas mantém proporção 16:9 com tiles de cenário. O PWA e os projetos nativos declaram orientação horizontal; a reprodução dos áudios locais é desbloqueada após o primeiro gesto.
