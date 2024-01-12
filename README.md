Sistema de Pagamento
Este é um projeto de sistema de pagamento que consiste em uma aplicação web (front-end) e uma API (back-end). A aplicação permite aos usuários realizar operações como fazer login, criar pagamentos, gerenciar saldos, entre outras funcionalidades. A API fornece os serviços necessários para suportar essas operações.

Aplicação Web (Front-end)
Tecnologias Utilizadas
React (v18.2.0)
Vite (v4.4.5)
React Router DOM (v6.21.1)
Redux (v5.0.1) e React Redux (v9.0.4) para gerenciamento de estado
Axios (v1.6.5) para requisições HTTP
Yup (v1.3.3) para validação de formulários
Material-UI (v5.15.3) e Emotion para estilização
Jest para testes
ESLint (v8.45.0) para linting

Scripts Disponíveis

npm run dev: Inicia o servidor de desenvolvimento.
npm run build: Gera a build para produção.
npm run lint: Executa o ESLint para linting.
npm run preview: Inicia o servidor de pré-visualização.
Instalação de Dependências

npm install

API (Back-end)
Tecnologias Utilizadas
Node.js com Express (v4.18.2)
MongoDB com Mongoose (v8.0.3) para persistência de dados
Bcrypt (v5.1.1) para hashing de senhas
JSON Web Token (JWT) (v9.0.2) para autenticação
Jest e Supertest para testes
Helmet e CORS para segurança e controle de acesso

Scripts Disponíveis

npm start: Inicia a aplicação em modo de produção.
npm run dev: Inicia a aplicação em modo de desenvolvimento com nodemon.
npm test: Executa os testes usando Jest.
Instalação de Dependências

Funcionalidades
Login e logout na aplicação.
Criar, visualizar, editar e apagar pagamentos.
Criar, visualizar, editar e apagar saldos.
