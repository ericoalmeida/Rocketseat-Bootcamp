import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';

// Controllers
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
import TotalTiposOrdemServicoController from './app/Controllers/TotalTiposOrdemServicoController';
import TotalFrequenciaAlunoController from './app/Controllers/TotalFrequenciaAlunoController';
import TotalOrdemServicosAlunosController from './app/Controllers/TotalOrdemServicosAlunosController';

// Validações
import UsuarioValidacaoInclusao from './app/validacoes/usuario/Store';
import UsuarioValidacaoAlteracao from './app/validacoes/usuario/Update';
import SessaoValidacaoInclusao from './app/validacoes/sessao/Store';
import AlunoValidacaoInclusao from './app/validacoes/aluno/Store';
import AlunoValidacaoAlteracao from './app/validacoes/aluno/Update';
import MatriculaValidacaoInclusao from './app/validacoes/matricula/Store';
import MatriculaValidacaoAlteracao from './app/validacoes/matricula/Update';
import OrdemServicoValidacaoInclusao from './app/validacoes/ordemServico/Store';
import OrdemServicoValidacaoAlteracao from './app/validacoes/ordemServico/Update';
import PlanoValidacaoInclusao from './app/validacoes/plano/Store';
import PlanoValidacaoAlteracao from './app/validacoes/plano/Update';

// Middlewares
import middlewareAutenticacao from './app/Middlewares/autenticacao';

const routes = new Router();

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.get('/', (req, res) => {
  return res.json({ status: 'online' });
});

routes.post('/usuario', UsuarioValidacaoInclusao, UsuarioController.store);

routes.post(
  '/sessao',
  bruteForce.prevent,
  SessaoValidacaoInclusao,
  SessaoController.store
);

routes.get('/tipoordem', TipoOrdemServicosController.index);

routes.get('/aluno/acesso/:alunoId', AlunoController.show);
routes.get('/alunos/:alunoId/frequencia', FrequenciaAlunosController.index);
routes.post('/alunos/:alunoId/frequencia', FrequenciaAlunosController.store);

routes.get(
  '/aluno/:id/ordemservico/total',
  TotalOrdemServicosAlunosController.show
);

routes.get('/aluno/:id/ordemservico', OrdemServicosAlunosController.index);
routes.post(
  '/aluno/:id/ordemservico',
  OrdemServicoValidacaoInclusao,
  OrdemServicosAlunosController.store
);
routes.delete('/aluno/:id/ordemservico', OrdemServicosAlunosController.delete);

routes.get(
  '/aluno/:id/frequencia/totalfrequencia',
  TotalFrequenciaAlunoController.show
);

routes.use(middlewareAutenticacao);

routes.put('/usuario', UsuarioValidacaoAlteracao, UsuarioController.update);

routes.get('/aluno/totalalunos', TotalAlunosController.show);
routes.get('/plano/totalplanos', TotalPlanosController.show);
routes.get('/matricula/totalmatriculas', TotalMatriculasController.show);
routes.get(
  '/ordemservico/totalordemservico',
  TotalOrdensServicosController.show
);
routes.get('/tipoordem/totaltipoordem', TotalTiposOrdemServicoController.show);

routes.get('/aluno', AlunoController.index);
routes.post('/aluno', AlunoValidacaoInclusao, AlunoController.store);
routes.get('/aluno/:alunoId', AlunoController.show);
routes.put('/aluno/:alunoId', AlunoValidacaoAlteracao, AlunoController.update);
routes.delete('/aluno/:alunoId', AlunoController.delete);

routes.get('/plano', PlanoController.index);
routes.post('/plano', PlanoValidacaoInclusao, PlanoController.store);
routes.get('/plano/:planoId', PlanoController.show);
routes.put('/plano/:planoId', PlanoValidacaoAlteracao, PlanoController.update);
routes.delete('/plano/:planoId', PlanoController.delete);

routes.get('/matricula', MatriculaController.index);
routes.post(
  '/matricula',
  MatriculaValidacaoInclusao,
  MatriculaController.store
);
routes.get('/matricula/:matriculaId', MatriculaController.show);
routes.get('/matricula/aluno/:alunoId', MatriculaAlunoController.show);
routes.put(
  '/matricula/:matriculaId',
  MatriculaValidacaoAlteracao,
  MatriculaController.update
);
routes.delete('/matricula/:matriculaId', MatriculaController.delete);

routes.post('/tipoordem', TipoOrdemServicosController.store);
routes.get('/tipoordem/:tipoordemId', TipoOrdemServicosController.show);
routes.put('/tipoordem/:tipoordemId', TipoOrdemServicosController.update);
routes.delete('/tipoordem/:tipoordemId', TipoOrdemServicosController.delete);

routes.get('/ordemservico', OrdemServicosController.index);
routes.get('/ordemservico/:id', OrdemServicosController.show);
routes.put(
  '/ordemservico/:id/retorno',
  OrdemServicoValidacaoAlteracao,
  OrdemServicosController.update
);

export default routes;
