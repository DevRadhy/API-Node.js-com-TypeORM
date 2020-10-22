# API Node.js com TypeORM

![typeorm](https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png)

## Introdução

Intrudução ao **TypeORM**, aqui irei mostrar como foi a minha impressão usando o **ORM**, então para esse projeto criei uma simples **API** de criação e listagem de usuários.

Esse projeto irá abordar sobre **Migrations**, e arquitetura **MVC**.

Caso queira navegar por tópicos, aqui está os tópicos abordados:

* **[Setup do Projeto](#setup)**
* **[Configurando Typescript](#typescript)**
* **[Inicio do projeto com Express](#start)**
* **[Trabalhando com TypeORM](#typeorm)**
* **[Resultado](#results)**
* **[Conclusão](#thankyou)**

## <div id="setup" /> Setup do Projeto

Nesse projeto estou usando: 

* **Node.js**
* **Typescript**
* **Express**
* **TypeORM**
* **SQLITE**

também estou usando outras tecnologias:

* **Ts-node-dev ( dar reload automático )**
* **Insomnia ( fazer requisições )**

## Estrutura

O Projeto foi criado no seguinte formato:

![setup](link)

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

## package.json

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

Esse arquivo possui alguns scripts, para uso da `cli.js` do typeorm e para inicar o projeto com **ts-node-dev**.

## <div id="typescript" /> Configurando Typescript

Aqui irei mostrar quais foram as configurações usadas com o **Typescript**.

## tsconfig.json

```json
{
  "compilerOptions": {
    /* Basic Options */
    "target": "es2017",
    "module": "commonjs",
    "allowJs": true,

    /* Strict Type-Checking Options */
    "strict": true,
    "strictPropertyInitialization": false,

    /* Module Resolution Options */
    "esModuleInterop": true,

    /* Experimental Options */
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,

    /* Advanced Options */
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

O arquivo não teve muitas mudanças como você pode ver e encontrar [aqui](link).

Só foi alterado algumas opções:

`target` foi alterado para **es2017**, que é a versão que você irá dar suporte. ( O padrão é **es5** )

`strictPropertyInitialization` foi adicionado e alterado para `false`, para permitir a inicialização de propriedades sem atribuir algum valor a elas. ( O padrão é `true` )

`experimentalDecorators` e `emitDecoratorMetadata` foram adicionados e atribuidos como `true` para permitir o uso de **Decorators**, que será usado pelo **TypeORM**. ( O padrão é `false` )

## <div id="start" /> Inicio do projeto com Express

## Arquivos de rotas

Aqui temos 3 arquivos que trabalharam diretamente com o **express**, `app.ts`, `server.ts` e `routes.ts`.

## App.ts

Aqui é onde iremos importar o **express** e criar nosso `app`:

```js
const app = express();
```

nosso `app.ts` irá ficar assim:

```js
import express from 'express';
import routes from './routes';

import './database/connection';

const app = express();

app.use(express.json());
app.use(routes);

export default app;
```

No `app.ts` temos também a importção das rotas e da conxão com o **TypeORM**.

e temos o `use` do **express** que que permitirá ele a reconhecer `JSON` e usar as rotas.

## Routes.ts

Nosso `routes.ts` está da seguinte forma:

```js
import { Router } from 'express';
import UserController from './controllers/UserController';

const routes = Router();

// Rota de listagem de usuários
routes.get('/users', UserController.index);

// Rota de listagem de um unico usuário
routes.get('/users/:id', UserController.show);

// Rota de criação de usuário
routes.post('/user', UserController.create);

export default routes;
```

Aqui foi importado de dentro do **express** o `Router` para a criação das rotas, e temos a importação do nosso **Controller**, `UserController`, que você pode encontrar [aqui](link).

## Server.ts

Aqui basicamento só importtamos e iniciamos nosso `app`:

```js
import app from './app';

app.listen(3333);
```

## <div id="typeorm" /> Trabalhando com TypeORM

Aqui mostrarei como foi a configuração, e uso do **TypeORM** seguindo a documentação.

## ormconfig.json

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

para mais detalhes você pode acessar a documentação [aqui](https://typeorm.io/#/using-ormconfig).

## Connection

Agora iremos conectar com o **TypeORM** para começarmos a utilizalo.

Nesse projeto eu criei um arquivo `connection.ts` na pasta `database` com o seguinte conteúdo:

```js
import { createConnection } from 'typeorm';

createConnection();
```

e chamei esse arquivo no `app.ts`

```js
import './database/connection';
```

para mais detalhes acesse a documentação [aqui](https://typeorm.io/#/connection).

## Entity

### O que é Entity?

`Entity` é uma classe que mapeia para a DB ( ou coleção quando usamos MongoDB ).

Para criar uma `Entity`, você pode atirbuir `@Entity` a uma **Class**.

### Entity Columns

Para mapear as colunas de uma **Class** para o banco de dados, usamos `@Column`.

e assim fica o nosso **Model** em `User.ts`

```js
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;
}
```

Podemos ver que a mais alguns tipos de `Entity Columns` atribuidos, e para saber mais sobre `Entity` e `Column` você pode acessar a documentação [aqui](https://typeorm.io/#/entities).

## Migrations

Em produção, trabalhando com um time você precisa ter um projeto sincronizado, para não gerar conflitos, e para isso que existem as **migrations**.

## Migrations usando CLI

Usando a `CLI` do **TypeORM** iremos criar nossas migrations, esse projeto usa somente uma **migration** para a table de criação de usuário.

Para criar uma nova migration usando a `CLI` do **TypeORM** basta usar o seguinte comando: 

usando npm:
```bash
npx typeorm migration:create -n User
```

ou usando yarn:

```bash
yarn typeorm migration:create -n User
```

onde `User` é o nome da **migration**, quando for gerada a **migration**, você verá algo como `{TIMESTAMP}-User.ts`, onde `{TIMESTAMP}` é um registro de data e horário que a **migration** foi gerada.

## Criando uma migration

Quando você entrar no arquivo gerando pela `CLI`, verá algo parecido com isso:

```js
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1603254408159 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
```

Aqui temos `up` e `down`, em `up` ficará todas as alterações que você quer fazer, e em `down` ficará o reverso do que você fará em `up`.

Em `up` criaremos nossa tabela, já em `down` iremos deletar.

ficando assim:

```js
```


## Trabalhando com Repository

## Metodos Find

## <div id="results" /> Resultado

## <div id="thankyou" /> Conclusão