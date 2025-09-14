<h1>MVP API - Gestor de Requisições de Compras</h1>

[![Node.js](https://img.shields.io/badge/Node.js-20.x-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![JWT](https://img.shields.io/badge/JWT-orange?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Zod](https://img.shields.io/badge/Zod-4.x-3068B7?style=for-the-badge&logo=Zod&logoColor=white)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
<img width="950" height="460" alt="image" src="https://github.com/user-attachments/assets/5e86955b-625e-4799-956a-5f6e6d8a0c5b" />


<i>Projeto de API desenvolvido como candidato à solução ao "Desafio Backend Junior", etapa do processo seletivo para vaga homônima em empresa do segmento Construtech.</i>

<h2>Estrutura de Arquivos 📂</h2>


```
desafio-backend-jr/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── prisma/                   # Armazena Schemas e Migrates
├── src/
│   ├── app.ts                # Configuração do Express e middlewares globais
│   ├── server.ts             # Inicialização do servidor
│   ├── config/db.ts          # Conexão com banco de dados
│   ├── controllers/          # Controladores HTTP
│   │   ├── AuthController.ts
│   │   ├── ReportController.ts
│   │   └── RequestController.ts
│   ├── dtos/                 # Data Transfer Objects
│   │   ├── auth.dto.ts
│   │   └── request.dto.ts
│   ├── errors/               # Definição de erros e handler global
│   ├── generated/prisma/     # Cliente Prisma gerado
│   ├── interfaces/           # Tipagens usadas no domínio
│   ├── middlewares/          # Middlewares de autenticação, validação e logs
│   ├── openapi/_config.ts    # Configuração de documentação OpenAPI
│   ├── repositories/         # Acesso ao banco via Prisma
│   ├── routes/               # Definição das rotas Express
│   ├── services/             # Regras de negócio
│   ├── tests/                # Testes unitários e de integração (Vitest)
│   └── utils/password.ts     # Utilitários de senha
├── tsconfig.json
├── vitest.config.ts
└── README.md
```


<h2>Instalar e Configurar ⚙️</h2>

```bash
git clone https://github.com/naranjii/desafio-backend-jr
cd desafio-backend-jr
cp .env.example .env
# edite as variáveis DATABASE_URL, JWT_SECRET
pnpm i
pnpm prisma migrate dev
pnpm prisma generate
pnpm test
pnpm dev
```

<h2>Recursos ✨</h2>
<ul>
  <li>Autenticação com <strong>JWT</strong></li>
  <li>Controle de acesso por <strong>roles</strong> (<code>consultant</code>, <code>approver</code>)</li>
  <li>CRUD de requisições de compra</li>
  <li>Submissão e aprovação de pedidos</li>
  <li>Consulta por lista geral ou ID com histórico de mudanças de estado </li>
  <li>Validação de dados com <strong>Zod</strong></li>
  <li>Documentação <strong>Swagger/OpenAPI</strong> em <code>/docs</code></li>
  <li>Logger customizado com <em>error serializer</em> e <strong>chalk</strong></li>
  <li>Testes unitários e de integração com <strong>Vitest</strong></li>
</ul>
<h2>Testes 🧪</h2>
<p><i></i>O projeto conta com teste automatizado para todas as principais funções (services) e a maioria das rotas, todos construídos com vitest. Também é possível testar requests e conferir a documentação no Swagger pela rota /docs. Os testes são executados com o comando:</i></p>

```bash
pnpm test
```
```
Fluxo /docs sugerido:
- Criar conta (POST /auth/register)
- Fazer login e obter token (POST /auth/login)
- Criar requisição (POST /requests)
- Submeter (POST /requests/:id/submit)
```

<h2>Notas e Observações:</h2>
<i></i><p>Procurei atender às especificações e limitações técnicas propostas pelo desafio, elaborando cada serviço à partir dos objetivos listados e ENDPOINTS fornecidos, um método, no entanto, me chamou à atenção: <i>Para a rota PATCH /request/:id</i>, forneci o serviço de sobrescrição de pedido, onde o 'items' anterior é completamente descartado e sobrescrito por um novo 'items' naquele ID. Para tal finalidade, julgo um método PUT ser mais apropriado, visto que o único valor interessante a se alterar são os itens do pedido, e não informações cadastrais ou algo do tipo, reservando ao método PATCH somente alterações parciais.</p>
<p>O desafio não descarta o recurso de modelos generativos porém exige que seja explicitado. Ao iniciar o processo criativo, consultei o ChatGPT para estabelecer uma orientação inicial e me ajudar a planejar as etapas de produção. Pedi para gerar os arquivos base de configuração do contêiner e um esquema de diretórios que logo foi abandonado. Prossegui com a coleção de dependências e desenvolvimento das primeiras rotas, controladores e serviços. Nesse ponto, pedi ao modelo para gerar os primeiros testes, ainda com Jest, após muitas correções de tipo o primeiro teste integrativo funcionou. Prossegui isolando o acesso dos Services à DB, alocando /repositories/ para lidar com o Prisma e refatorando. Depois disso ficou mais fácil desenvolver o restante das rotas, nesse ponto fiz muitas correções aos controllers e criei vários importas para melhorar o fluxo. Com as rotas prontas e protegidas funcionando, prossegui fortalecendo os tipos com Zod, onde encontrei certa dificuldade para resolver alguns logs de conflito e recorri à IA.</p>
<p>Concluí o MVP e foquei no ambiente de desenvolvimento para garantir escalabilidade, acresci um logMiddleware às rotas e um ErrorHandler para serializar os tipos de erro, nessa etapa enfrentei alguns conflitos de pacotes nos testes e a IA me sugeriu migrar os testes de jest para vitest como procedi. A maior parte do código em /tests/ foi gerado.</p>
<p>A documentação do Swagger/OpenAPI foi gerada através de uma biblioteca importada que pode ser encontrada em /openapi/. Quando me valendo de código gerado, faço revisões minuciosas e muitas vezes alterações que vão de mínimas até uma refatoração completa, mas sempre observando a concordância do trecho com meu contexto e fazendo ajutes essenciais.</p>
<p>Para o futuro do projeto, sugiro de imediato a adição do role 'Admin' ou análogo e uma rota de registro exclusiva para usuários 'approver'. No momento não é possível registrar um usuário 'approver' pela rota pública fornecida e portanto inviável o teste manual (OpenAPI) das funções approve/reject.</p></i>
