<h1>MVP API - Gestor de Requisições de Compras</h1>

[![Node.js](https://img.shields.io/badge/Node.js-18.x-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![JWT](https://img.shields.io/badge/JWT-orange?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)
[![Zod](https://img.shields.io/badge/Zod-3.x-3068B7?style=for-the-badge&logo=Zod&logoColor=white)](https://zod.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
<img width="925" height="593" alt="image" src="https://github.com/user-attachments/assets/d25bb39c-026d-4f29-9dca-ec16ee94f504" />

API desenvolvida como candidata à solução ao "Desafio Backend Junior", etapa do processo seletivo para vaga homônima em empresa do segmento Construtech.

<h2>Árvore de Diretórios 📂</h2>
<h2>Configuração ⚙️</h2>

```bash
git clone https://github.com/naranjii/desafio-backend-jr
cd desafio-backend-jr
cp .env.example .env
# edite as variáveis DATABASE_URL, JWT_SECRET, PORT
pnpm i
pnpm prisma migrate dev
pnpm prisma generate
pnpm test
pnpm dev

```

<h2>Features ✨</h2>
<ul>
  <li>Autenticação com <strong>JWT</strong></li>
  <li>Controle de acesso por <strong>roles</strong> (<code>consultant</code>, <code>approver</code>)</li>
  <li>CRUD de requisições de compra</li>
  <li>Submissão e aprovação de pedidos</li>
  <li>Validação de dados com <strong>Zod</strong></li>
  <li>Documentação <strong>Swagger/OpenAPI</strong> em <code>/docs</code></li>
  <li>Logger customizado com <em>error serializer</em> e <strong>chalk</strong></li>
</ul>
<h2>Testes 🧪</h2>

