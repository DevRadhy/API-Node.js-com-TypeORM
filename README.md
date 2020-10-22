# API Node.js com TypeORM

## Introdução

Intrudução ao **TypeORM**, aqui irei mostrar como foi a minha impressão usando o **ORM**, para esse projeto criei uma simples **API** de criação e listagem de usuários.

Esse projeto irá abordar sobre **Migrations**, e arquitetura **MVC**.

## Setup do Projeto

Nesse projeto estou usando: 

1. **Node.js**
2. **Typescript**
3. **Express**
4. **TypeORM**
5. **SQLITE**

também estou usando outras tecnologias:

1. **Ts-node-dev ( dar reload automático )**
2. **Insomnia ( fazer requisições )**

## Instalação

Instalando Typescript:

```
npm install typescript -D
```

Instalando Express e Tipagem:
```
npm install express
```

```
npm install @types/express -D
```

Instalando SQLITE:
```
npm install sqlite3
```

Instalando TypeORM:
```
npm install typeorm
```

## Package.json

```json
{
  "name": "orm",
  "version": "1.0.0",
  "main": "server.ts",
  "license": "MIT",
  "scripts": {
    "dev": "tsnd --transpile-only --ignore-watch node_modules ./src/server.ts",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "sqlite3": "^5.0.0",
    "typeorm": "^0.2.28"
  },
  "devDependencies": {
    "@types/express": "^4.17.8",
    "ts-node-dev": "^1.0.0",
    "typescript": "^4.0.3"
  }
}
```

Esse arquivo possui alguns scripts, para uso da cli.js do typeorm e para inicar o projeto com ts-node-dev.

## Ormconfig.json

```json
{
  "type": "sqlite",
  "database": "./src/database/database.sqlite",
  "migrations": [
    "./src/database/migrations/*.ts"
  ],
  "entities": [
    "./src/models/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
```

Aqui temos algumas configurações para o **TypeORM**, seguindo a documentação.

Aqui `type` é o banco de dados que está sendo usando.

Em `database` iremos passar o path do bando de dados.

Já os outros como o próprio nome diz `migrations` é onde você irá passar o path das migrations e `entities` é onde você irá passar o path dos models.

para mais detalhes você pode acessar [aqui](https://typeorm.io/#/using-ormconfig).

## Migrations

## Trabalhando com Repository

## Metodos Find

## Connection