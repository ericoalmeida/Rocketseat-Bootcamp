import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UsuarioController from './app/controllers/UsuarioController';
import SessaoController from './app/controllers/SessaoController';
import ArquivoController from './app/controllers/ArquivoController';
import ProvedorController from './app/controllers/ProvedorController';
import AgendamentoController from './app/controllers/AgendamentoController';
import CronogramaController from './app/controllers/CronogramaController';
import NotificacaoController from './app/controllers/NotificacaoController';
import DisponivelController from './app/controllers/DisponivelController';

import AutenticacaoMiddleware from './app/middlewares/autenticacao';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', (req, res) => res.json({ ok: true }));

routes.post('/usuario', UsuarioController.store);
routes.post('/sessao', SessaoController.store);

routes.use(AutenticacaoMiddleware);

routes.put('/usuario', UsuarioController.update);

routes.post('/arquivo', upload.single('arquivo'), ArquivoController.store);

routes.get('/provedor', ProvedorController.index);
routes.get('/provedor/:id/disponivel', DisponivelController.index);

routes.get('/agendamento', AgendamentoController.index);
routes.post('/agendamento', AgendamentoController.store);
routes.delete('/agendamento/:id', AgendamentoController.delete);

routes.get('/cronograma', CronogramaController.index);

routes.get('/notificacao', NotificacaoController.index);
routes.put('/notificacao/:id', NotificacaoController.update);

export default routes;
