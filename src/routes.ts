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