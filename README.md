# on21-imersao-js-S12-Projeto-Final
Projeto final com tema livre criado na ultima semana do curso de imersao JS na reprograma


NPM init -y :para iniciar o projeto
npm i eslint -D : instalar eslint 
npm i @eslint/config :para instalar eslint 
npm i typescript @types/node -D: instalar typescript e instalar a tipagem do node 
npx tsc --init : inicializar o typescript (internamente colocar 2017 no ano do environment)
npm install --save-dev jest : pra instalar o jest
npm install --save-dev @babel/preset-typescript: pra instalar o typescript no jest
npm install --save-dev babel-jest @babel/core @babel/preset-env : o jest suporta o TS via babel entao vc precisa instalar aqui para poder transpilar o TS
    - cria o arquivo de babel.config.ts acrescenta os presets que estao no site
    module.exports = {
    presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};
npm i ts-node -D: jest entender 

In memory repository, tem no blog do martin folower e sao basicamente persistencia de dados que sao arrays, criando essa estrutura para simular o banco de dados
referencia do projeto da rocketseat

na pasta de repository que consultaria o banco de dados para aplicar as aresposabilidade eu crio um arquivo com a interface da minha classe que ira executar as acoes no banco de dados - classe com o create do banco e um arquivo e a interface de retorno e envio dessa classe em outro 

quando  crio a minha instancia de repositoryCourse dentro de CourseService eu nao declaro ela em uma variavel pois dentro de uma classe nos temos apenas metodos e atributos e ela vai se comportar omo atributo para quando eu precisar utilizar a intancia dela dentro da outra classe ela use sempre a mesma, padrao de projeto singleton









