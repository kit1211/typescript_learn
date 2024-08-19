
# Typescript Learn

- CRUD rest Api
- Prisma MySql
- Jwt token
- Fastify
- reuse functions


#### Structure Project

```http
 /typescript_learn
│
├── prisma
│   └── schema.prisma
│
├── src
│   ├── plugins
│   │   ├── authenticate.ts
│   │   └── prisma.ts
│   │
│   ├── routers
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   └── product.ts
│   │
│   └── utils
│       ├── helper.ts
│       └── app.ts
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── tsconfig.json
```




## Install Project

```bash
  npm install
  npx prisma db push
```
## Start Project
```bash
  npm run dev
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

