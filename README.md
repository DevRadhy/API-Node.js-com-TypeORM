# API Node.js com TypeORM

![typeorm](https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png)

## Introdução

Introdução ao **TypeORM**, aqui irei mostrar como foi a minha impressão usando o **ORM**, então para esse projeto criei uma simples **API** de criação e listagem de usuários.

Esse projeto irá abordar sobre **Migrations**, e arquitetura **MVC**.

Caso queira navegar por tópicos, aqui está os tópicos abordados:

* **[Setup do Projeto](#setup)**
* **[Configurando Typescript](#typescript)**
* **[Inicio do projeto com Express](#start)**
* **[Trabalhando com TypeORM](#typeorm)**
* **[Views](#views)**
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

![setup](https://user-images.githubusercontent.com/50425715/96940358-e9d2d580-14a5-11eb-820e-fe0619812fa7.png)

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

Esse arquivo possui alguns scripts, para uso da `cli.js` do typeorm e para iniciar o projeto com **ts-node-dev**.

## <div id="typescript" /> Configurando Typescript

Aqui irei mostrar quais foram as configurações usadas com o **Typescript**.

## tsconfig.json

```json
{
  "compilerOptions": {
    // Basic Options
    "target": "es2017",
    "module": "commonjs",
    "allowJs": true,

    // Strict Type-Checking Options
    "strict": true,
    "strictPropertyInitialization": false,

    // Module Resolution Options
    "esModuleInterop": true,

    // Experimental Options
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,

    // Advanced Options
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

O arquivo não teve muitas mudanças como você pode ver e encontrar [aqui](https://github.com/DevRadhy/API-Node.js-com-TypeORM/blob/master/tsconfig.json).

Só foi alterado algumas opções:

`target` foi alterado para **es2017**, que é a versão que você irá dar suporte. ( O padrão é **es5** )

`strictPropertyInitialization` foi adicionado e alterado para `false`, para permitir a inicialização de propriedades sem atribuir algum valor a elas. ( O padrão é `true` )

`experimentalDecorators` e `emitDecoratorMetadata` foram adicionados e atribuídos como `true` para permitir o uso de **Decorators**, que será usado pelo **TypeORM**. ( O padrão é `false` )

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

No `app.ts` temos também a importação das rotas e da conexão com o **TypeORM**.

e temos o `use` do **express** que permitirá ele reconhecer e trabalhar com `JSON`, e usar as `routes`.

## Routes.ts

Nosso `routes.ts` está da seguinte forma:

```js
import { Router } from 'express';
import UserController from './controllers/UserController';

const routes = Router();

// Rota de listagem de usuários
routes.get('/users', UserController.index);

// Rota de listagem de um único usuário
routes.get('/users/:id', UserController.show);

// Rota de criação de usuário
routes.post('/user', UserController.create);

export default routes;
```

Aqui foi importado de dentro do **express** o `Router` para a criação das rotas, e temos a importação do nosso **Controller**, `UserController.ts`, que você pode encontrar [aqui](https://github.com/DevRadhy/API-Node.js-com-TypeORM/blob/master/src/controllers/UserController.ts).

## Server.ts

Aqui basicamente só importamos e iniciamos nosso `app`:

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

Agora iremos conectar com o **TypeORM** para começarmos a útilizar.

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

Para criar uma `Entity`, você pode atribuir `@Entity` a uma **Class**.

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

Podemos ver que a mais alguns tipos de `Entity Column` atribuídos, e para saber mais sobre `Entity` e `Column` você pode acessar a documentação [aqui](https://typeorm.io/#/entities).

## Migrations

Em produção, trabalhando com um time você precisa ter um projeto sincronizado, para não gerar conflitos, e para isso que existem as **migrations**.

## Migrations usando CLI

Usando a `CLI` do **TypeORM** iremos criar nossas migrations, esse projeto usa somente uma **migration** para a tabela de criação de usuário.

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
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class User1603254408159 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'age',
          type: 'decimal',
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users');
  }
}
```

Aqui criei uma tabela chamada `users`, com as colunas, `id`, `name`, `age`, em formato de objeto, onde:

`id` é auto increment do tipo `integer`.

`name` é do tipo `varchar` e será preenchido na requisição.

`age` é do tipo `decimal` e também será preenchido na requisição de criação de usuário.

## Rodando as Migrations

Usando a `CLI` do **TypeORM**, usamos o seguinte comando:

usando npm:
```bash
npx typeorm migration:run
```

ou usando yarn:
```bash
yarn typeorm migration:run
```

e conforme foi configurado o arquivo `ormconfig.json` na propriedade `database`, será criado um arquivo chamando `database.sqlite` na pasta `database`, logo abaixo das migrations e do `connection.ts`.

Para mais detalhes de como trabalhar com migration no **TypeORM** acesse a documentação [aqui](https://typeorm.io/#/migrations).

## Trabalhando com Repository

`Repository` é apenas um tipo de gerenciador de Entidades mas com operações limitadas uma uma `Entity` concreta.

Você pode acessar um `repository` usando `getRepository()` e passando a `Entity` que foi criado, no caso o model `User`.

```js
const userRepository = getRepository(User);
```

um exemplo de uso é na criação de um usuário:

```js
async create(request: Request, response: Response) {
    const { name, age } = request.body;

    const userRepository = getRepository(User);

    const data = {
      name,
      age,
    };

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(201).json(user);
  }
```

Você pode encontrar esse código no `UserController.ts`, [aqui]().

Para mais detalhes de como usar os `Repository` do **TypeORM**, acesse a documentação [aqui](https://typeorm.io/#/working-with-repository).

## Metodos Find

Para fazer uma chamada a um banco de dados usando **TypeORM** basicamente você irá usar o `find()`.

como na listagem de todos os usuários:

```js
async index(response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    const userRender = UserView.renderMany(users);

    return response.status(200).json(userRender);
  }
```

onde usamos somente:

```js
const users = await userRepository.find();
```

sem passar nada a `find()`, e isso nos retornará todas as informações do banco de dados.

já na listagem de um único usuário:

```js
async show(request: Request, response: Response) {
    const { id } = request.params;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne(id);

    return response.status(200).json(user);
  }
```

temos:

```js
const user = await userRepository.findOne(id);
```

temos o `findOne()` que nos retornará somente uma associação da tabela, aqui é passado o `id`, que terá o retorno de um único usuário que possui o `id` igual ao que foi passado.

você pode encontrar o código em `UserController.ts`, [aqui](https://github.com/DevRadhy/API-Node.js-com-TypeORM/blob/master/src/controllers/UserController.ts).

e para mais detalhes sobre `find`, acesse a documentação [aqui](https://typeorm.io/#/find-options).

## <div id="views" /> Views

Agora vou falar sobre as `Views` que apareceram na listagem de usuários.

## Uso das Views

Usar views pode ser útil para retornar dados depois de uma requisição, pois em alguns casos você não irá querer retornar todos os dados que a chamada ao banco de dados trás, como no nosso projeto, por exemplo, aqui quando é feita uma requisição para listar todos os usuários, é feita uma chamada ao banco de dados, que acaba retornando todas as informações dos usuários, no caso, `id`, `name` e `age`, mas eu quero retornar somente os nomes, então é usado as views para filtrar as informações e retornar ao usuário somente o que você realmente deseja.

o arquivo `users_view.ts` está assim:

```js
import User from "../models/User";

export default {
  render(user: User) {
    return {
      name: user.name
    }
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user))
  }
}
```

Aqui temos duas funções, `render` e `renderMany` que irão tratar os dados, `render` irá receber um usuário com todos os dados e retornar somente o `name`, já o `renderMany` irá tratar um array de usuários, percorrendo cada um e chamando a função `render` para tratar cada usuário que está sendo percorrido.

## <div id="results" /> Resultado

 E agora chagamos ao resultado.

 Começamos rodando nossa aplicação:

 usando npm:
 ```bash
 npm run dev
 ```

 ou yarn:
 ```bash
 yarn dev
 ```

 Usando o **Insomnia** para fazer as requisições, começamos criando um usuário:

 ![user-create](https://user-images.githubusercontent.com/50425715/96940457-2c94ad80-14a6-11eb-99b5-a483342bc905.png)

 Temos o seguinte resultado após a criação:

 ![result-user-create](https://user-images.githubusercontent.com/50425715/96940490-3cac8d00-14a6-11eb-8112-04985d8c09ec.png)

 Agora com as `Views` entrando em ação iremos listar todos os usuários:

 ![list-user](https://user-images.githubusercontent.com/50425715/96940554-61086980-14a6-11eb-98f0-6c477e2edfef.png)

 Temos esse resultado:

 ![result-list-user](https://user-images.githubusercontent.com/50425715/96940575-6fef1c00-14a6-11eb-81e4-738b4f751675.png)


 E listando somente um usuário, com o `id` `6`, por exemplo, temos:

 ![list-user](https://user-images.githubusercontent.com/50425715/96940586-7ed5ce80-14a6-11eb-978b-7f445f20b361.png)

 Com esse resultado:

![result-list-user](https://user-images.githubusercontent.com/50425715/96940622-99a84300-14a6-11eb-94d4-a587001df91f.png)



## <div id="thankyou" /> Conclusão

Se você chegou até aqui, muito obrigado =)

Como considerações, posso dizer que o **TypeORM** tem muitas coisas que podem facilitar o desenvolvimento, assim como outras ferramentas, e ele não se limita a esses exemplos, o **TypeORM** tem uma documentação bem atrativa e com diversos exemplos e casos de uso, caso tenha interesse em conhecer mais, você pode acessar a documentação completa do **TypeORM** [aqui](https://typeorm.io/#/).