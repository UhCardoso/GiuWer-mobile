# GiuWer
(*Apenas para estudo*)
É uma aplicação de troca de mensagens simples. Ela foi desenvolvida para que eu pudesse praticar as renderizações em tempo real, na aplicação ReacJS, utilizando o *Socket.io* e também praticar o uso da *contextAPI* para efetuar a autenticação da aplicacação.

Ela não suporta várias cponversas ao msm tempo. Então é uma boa para você usar com aquele amigo de confiança ou com sua(seu) crush que sempre têm a desculpa de não gostar de entrar nos aplicativos de mensagens convencionais hahaha

Brincadeiras a parte, bora para as features!

![alt text](https://thumbs2.imgbox.com/d2/66/2TGPEMOC_t.png)

---
## Instalação

- 1- Antes de tudo você deverá ter o [Nodejs](https://nodejs.org) instalado na sua máquina.
- 2- Também instale o [Expo-cli](https://docs.expo.io/workflow/expo-cli/)
- 2- Abra o seu terminal e dê o comando `git clone https://github.com/UhCardoso/GiuWer-mobile.git`
- 3- Dê o comando `cd GiuWer-mobile`
- 4- Dê o comando `npm install`
- 5- execute o programa com o comando `expo start`

---

## Features

- **Login:**

Ao logar, o ReactJS vai fazer a autenticação, através da biblioteca *Axios*, com o backend Nodejs que irá retornar os dados de autenticação, que serão armazenados na aplicação utilizando o *ContextAPI*:

![alt text](https://s4.gifyu.com/images/loginee7d39d1d665df34.gif)

- **Enviar mensagem:**

Logado na aplicação o usuário poderá enviar e receber mensagens que irão ser renderizadas em tempo real na aplicação. Isso acontece, pois quando a mensagem enviada é salva no banco de dados, no fim do processo o backend enviará uma mensagem para o frontend através da biblioteca *Socket.io*, que tembém é utilizada no frontend (*Socket.io-client*). Ao receber a mensagem do backend, a aplicação em ReactNative irá executar uma função que adicionará a nova mensagem na tela:

![alt text](https://s4.gifyu.com/images/send.gif)

- **Excluir mensagem:**

Clicando nos 3 pontinhos ao lado do balão da mensagem, a aplicação irá carregar uma nova janela com a opção de excluir mensagem. ao excluir a mensagem, ela será removida da conversa, sem recarregar a página logo após a mensagem ser apagada do banco de dados:

![alt text](https://s4.gifyu.com/images/delet.gif)
