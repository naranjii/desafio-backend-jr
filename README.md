<h1> 'desafio-backend-jr': MatheusLaranjeira@Suplos</h1>
<h2>Descrição do desafio :</h2>
<p>'MVP de sistema de gestão de requisições de compra, que permite a usuários cadastrar requisições, adicionar itens e acompanhar o status até aprovação ou rejeição.'</p>
<h2>Feature stack:</h2>


---
<h4>Árvore de diretórios:</h4>
```directory tree
desafio-backend-jr/
│  .env
│  package.json
│  tsconfig.json
│  README.md
├─ .devcontainer/
│  ├─ devcontainer.json
│  ├─ docker-compose.yml
│  └─ Dockerfile
└─ src/
   ├─ app.ts                    —→ Express, global middleware
   ├─ server.ts
   │
   ├─ config/                   —→ DB/MySQL JWT
   │   └─ db.ts
   │
   ├─ models/                   —→ Entidades/esquemas
   │   ├─ User.ts
   │   ├─ PurchaseRequest.ts
   │   ├─ RequestItem.ts
   │   └─ ApprovalHistory.ts
   │
   ├─ controllers/              —→ Handlers de requisições e respostas
   │   ├─ AuthController.ts
   │   ├─ RequestController.ts
   │   └─ ReportController.ts
   │
   ├─ services/                 —→ Privilégios ou "Regras de negócio", serviços de autenticação
   │   ├─ AuthService.ts
   │   ├─ RequestService.ts
   │   └─ ReportService.ts
   │
   ├─ routes/                   —→ Rotas ~ Endpoints
   │   ├─ authRoutes.ts
   │   ├─ requestRoutes.ts
   │   └─ reportRoutes.ts
   │
   ├─ middlewares/               —→ autenticação, roles, etc.
   │   ├─ authMiddleware.ts
   │   └─ roleMiddleware.ts
   │
   ├─ utils/                     —→ Componentização para hash, logger...
   │   ├─ password.ts
   │   └─ logger.ts
   │
   └─ tests/                     —→ Testes unitários...
       ├─ auth.test.ts
       └─ request.test.ts
```

Uso de inteligências artificiais:
Lorem Ipsum copilot usado na documentação, configurações iniciais (.devcontainer/ prisma placeholders), trechos de jest em src/tests/ e debugging.


---

Dependências localizadas em ```package.json```
```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm test
pnpm dev
```
