import { Router } from 'express';

import UsuarioController from './app/Controllers/UsuarioController';
import SessaoController from './app/Controllers/SessaoController';
import AlunoController from './app/Controllers/AlunoController';
import PlanoController from './app/Controllers/PlanoController';
import MatriculaController from './app/Controllers/MatriculaController';
import MatriculaAlunoController from './app/Controllers/MatriculaAlunoController';
import FrequenciaAlunosController from './app/Controllers/FrequenciaAlunosController';
import TipoOrdemServicosController from './app/Controllers/TipoOrdemServicosController';
import OrdemServicosController from './app/Controllers/OrdemServicosController';
import OrdemServicosAlunosController from './app/Controllers/OrdemServicosAlunosController';
import TotalAlunosController from './app/Controllers/TotalAlunosController';
import TotalPlanosController from './app/Controllers/TotalPlanosController';
import TotalMatriculasController from './app/Controllers/TotalMatriculasController';
import TotalOrdensServicosController from './app/Controllers/TotalOrdensServicosController';
import TotalTiposOrdemServicoController from './app/Controllers/TotalTiposOrdemServicoController'

import middlewareAutenticacao from './app/Middlewares/autenticacao';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ status: 'online' });
});

routes.post('/usuario', UsuarioController.store);
routes.post('/sessao', SessaoController.store);

routes.get('/alunos/:alunoId/frequencia', FrequenciaAlunosController.index);
routes.post('/alunos/:alunoId/frequencia', FrequenciaAlunosController.store);

routes.use(middlewareAutenticacao);

routes.put('/usuario', UsuarioController.update);

routes.get('/aluno/totalalunos', TotalAlunosController.show);
routes.get('/plano/totalplanos', TotalPlanosController.show);
routes.get('/matricula/totalmatriculas', TotalMatriculasController.show);
routes.get(
  '/ordemservico/totalordemservico',
  TotalOrdensServicosController.show
);
routes.get(
  '/tipoordem/totaltipoordem',
  TotalTiposOrdemServicoController.show
);

routes.get('/aluno', AlunoController.index);
routes.post('/aluno', AlunoController.store);
routes.get('/aluno/:alunoId', AlunoController.show);
routes.put('/aluno/:alunoId', AlunoController.update);
routes.delete('/aluno/:alunoId', AlunoController.delete);

routes.get('/plano', PlanoController.index);
routes.post('/plano', PlanoController.store);
routes.get('/plano/:planoId', PlanoController.show);
routes.put('/plano/:planoId', PlanoController.update);
routes.delete('/plano/:planoId', PlanoController.delete);

routes.get('/matricula', MatriculaController.index);
routes.post('/matricula', MatriculaController.store);
routes.get('/matricula/:matriculaId', MatriculaController.show);
routes.get('/matricula/aluno/:alunoId', MatriculaAlunoController.show);
routes.put('/matricula/:matriculaId', MatriculaController.update);
routes.delete('/matricula/:matriculaId', MatriculaController.delete);

routes.get('/tipoordem', TipoOrdemServicosController.index);
routes.post('/tipoordem', TipoOrdemServicosController.store);
routes.get('/tipoordem/:tipoordemId', TipoOrdemServicosController.show);
routes.put('/tipoordem/:tipoordemId', TipoOrdemServicosController.update);
routes.delete('/tipoordem/:tipoordemId', TipoOrdemServicosController.delete);

routes.get('/aluno/:id/ordemservico', OrdemServicosAlunosController.index);
routes.post('/aluno/:id/ordemservico', OrdemServicosAlunosController.store);
routes.delete('/aluno/:id/ordemservico', OrdemServicosAlunosController.delete);

routes.get('/ordemservico', OrdemServicosController.index);
routes.get('/ordemservico/:id', OrdemServicosController.show);
routes.put('/ordemservico/:id/retorno', OrdemServicosController.update);

export default routes;
