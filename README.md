# UrbnX - Ecommerce moderno de venda de roupas
Essa é a API Rest do projeto UrbnX, construída com NestJS, Prisma e MongoDB, além de integração com a Stripe para processamento de pagamentos e também utilização do webhook para sincronização de dados. As principais funcionalidades da api consiste em:
- Autenticação OAuth com GitHub e Google
- Carrinho de compras
- Favoritos
- Rotas protegidas com Guards
- Integração com gateway de pagamento
- Avaliação de produtos comprados

Para rodar o projeto localmente, clone esse repositório e em seguida digite no terminal:

```bash
yarn install; yarn start:dev
```

Caso você use outro instalador de pacotes como o npm, yarn ou pnpm, exclua a pasta ` yarn.lock ` e em seguida execute o comando do instalador de pacotes no terminal: 

```bash
npm install; npm run dev
```

```bash
pnpm install; pnpm run dev
```

No arquivo `.env.example`, há o exemplo das variáveis de ambiente utilizadas no projeto, basta apenas adicionar os valores de cada uma.
