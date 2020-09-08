import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input, Select } from '@rocketseat/unform';
import { addMonths, addDays, parseISO, format } from 'date-fns';
import * as Yup from 'yup';

import {
  MdDoneAll,
  MdKeyboardArrowLeft,
  MdDeleteForever,
} from 'react-icons/md';

import { SBVoltar, SBSalvar } from '~/componentes/Botoes';

import {
  CtPrincipalJanela,
  CtCabecalhoJanela,
  CtConteudoJanela,
  CtCamposSuperiores,
  CtCamposInferiores,
  CtInternoCampos,
  CtBotoesJanela,
  CtTituloJanela,
} from '~/componentes/Containers';

import api from '~/servicos/api';
import historico from '~/servicos/historico';

import { formatPrice, formatarSomenteDataExtenso } from '~/util/format';
import acaoAtual from '~/util/acaoAtual';
import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

import {
  incluirMatricula,
  alterarMatricula,
  excluirMatricula,
} from '~/loja/modulos/matricula/acoes';

const esquemaValidacao = Yup.object().shape({
  aluno_id: Yup.number()
    .min(1, 'Selecione um aluno')
    .required('Aluno é obrigátorio'),
  plano_id: Yup.number()
    .min(1, 'Selecione um plano')
    .required('Plano é obrigátorio'),
  data_inicio: Yup.date()
    .min(
      format(addDays(new Date(), 1), 'yyyy-MM-dd'),
      'Informe uma data que ainda não passou'
    )
    .required('Data é um campo obrigtorio'),
});

export default function CadMatriculas() {
  const executar = useDispatch();
  const [alunos, setAlunos] = useState([]);
  const [planos, setPlanos] = useState([]);

  const matricula = useSelector(state => state.matricula.matricula);
  const acao = useSelector(state => state.matricula.acao);

  const [aluno, setAluno] = useState(0);
  const [plano, setPlano] = useState(0);

  const [dataInicial, setDataInicial] = useState(
    format(addDays(new Date(), 1), 'yyyy-MM-dd')
  );

  const [dataTermino, setDataTermino] = useState(
    format(addDays(new Date(), 1), 'yyyy-MM-dd')
  );

  const [valorTotal, setValorTotal] = useState(formatPrice(0));

  const [planoEscolhido, setPlanoEscolhido] = useState([]);

  function enviarDadosDaMatricula(data) {
    switch (acao) {
      case acaoCreate: {
        executar(incluirMatricula(data));
        break;
      }

      case acaoUpdate: {
        executar(alterarMatricula({ id: matricula.id, ...data }));
        break;
      }

      case acaoDelete: {
        executar(excluirMatricula(matricula.id));
        break;
      }

      default:
    }
  }

  function capturaAlteracoesDeAluno(e) {
    setAluno(Number(e.target.value));
  }

  function capturaAlteracoesDePlano(e) {
    setPlano(Number(e.target.value));
    setPlanoEscolhido(planos.find(item => item.id === Number(e.target.value)));
  }

  function capturaAlteracoesDeDataInicial(e) {
    setDataInicial(format(parseISO(e.target.value), 'yyyy-MM-dd'));
  }

  useEffect(() => {
    function calcularValoresDoPlano() {
      try {
        setDataTermino(
          format(
            addMonths(parseISO(dataInicial), planoEscolhido.duracao),
            'yyyy-MM-dd'
          )
        );

        setValorTotal(
          formatPrice(planoEscolhido.duracao * planoEscolhido.preco || 0)
        );
      } catch (error) {
        toast.error(error);
      }
    }

    calcularValoresDoPlano();
  }, [planoEscolhido, dataInicial]);

  useEffect(() => {
    async function carregarDados() {
      const [listaAlunos, listaPlanos] = await Promise.all([
        api.get('/aluno', { params: { pagina: 1, limite: 100 } }),
        api.get('/plano', { params: { pagina: 1, limite: 100 } }),
      ]);

      const optAlunos = listaAlunos.data.map(alnItem => ({
        id: alnItem.id,
        title: alnItem.nome,
      }));

      optAlunos.push({ id: 0, title: 'Selecione' });

      setAlunos(optAlunos);

      const optPlanos = listaPlanos.data.map(plnItem => ({
        id: plnItem.id,
        title: plnItem.titulo,
        duracao: plnItem.duracao,
        preco: plnItem.preco,
      }));

      optPlanos.push({ id: 0, title: 'Selecione' });

      setPlanos(optPlanos);
    }

    carregarDados();
  }, []);

  useEffect(() => {
    if (!matricula) return;

    setAluno(matricula.aluno_id);
    setPlano(matricula.plano_id);
    setDataInicial(matricula.data_inicio);
    setDataTermino(matricula.data_termino);
    setValorTotal(matricula.preco_total);
  }, [matricula]);

  useEffect(() => {
    async function alunoJaPossuiMatriculaAtiva() {
      if (aluno === 0) return;
      if (acao !== acaoCreate) return;

      const [matriculaAtiva] = await Promise.all([
        api.get(`matricula/aluno/${aluno}`),
      ]);

      const matriculaAluno = matriculaAtiva.data.map(item => ({
        status: item.ativa,
        data_termino: item.data_termino,
      }));

      if (matriculaAluno && matriculaAluno[0].status) {
        toast.info(
          `Este aluno ja possui uma matricula ativa até ${formatarSomenteDataExtenso(
            matriculaAluno[0].data_termino
          )}`
        );

        setTimeout(() => {
          setAluno(0);
        }, 3000);
      }
    }

    alunoJaPossuiMatriculaAtiva();
  }, [aluno, acao]);

  return (
    <CtPrincipalJanela>
      <Form
        onSubmit={enviarDadosDaMatricula}
        initialData={matricula}
        schema={esquemaValidacao}
      >
        <CtCabecalhoJanela>
          <CtTituloJanela>
            <strong>Matriculas</strong>
            <span>{acaoAtual(acao)}</span>
          </CtTituloJanela>
          <CtBotoesJanela>
            <SBVoltar
              type="button"
              onClick={() => historico.push('/matricula')}
            >
              <MdKeyboardArrowLeft size={20} color="#fff" />
              <span>VOLTAR</span>
            </SBVoltar>
            <SBSalvar type="submit">
              {acao === acaoDelete ? (
                <>
                  <MdDeleteForever size={20} color="#fff" />
                  <span>EXCLUIR</span>
                </>
              ) : (
                <>
                  <MdDoneAll size={20} color="#fff" />
                  <span>SALVAR</span>
                </>
              )}
            </SBSalvar>
          </CtBotoesJanela>
        </CtCabecalhoJanela>

        <CtConteudoJanela>
          <CtCamposSuperiores>
            <Select
              name="aluno_id"
              options={alunos}
              label="ALUNO"
              value={aluno}
              onChange={capturaAlteracoesDeAluno}
              disabled={acao !== acaoCreate}
            />
          </CtCamposSuperiores>

          <CtCamposInferiores>
            <CtInternoCampos>
              <Select
                name="plano_id"
                options={planos}
                label="PLANO"
                value={plano}
                onChange={capturaAlteracoesDePlano}
                disabled={acao === acaoDelete}
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                type="date"
                name="data_inicio"
                label="DATA INICIO"
                value={dataInicial}
                onChange={capturaAlteracoesDeDataInicial}
                disabled={acao === acaoDelete}
                min={addDays(new Date(), 1)}
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                type="date"
                disabled
                name="data_termino"
                label="DATA TÉRMINO"
                value={dataTermino}
                min={addDays(new Date(), 1)}
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="preco_total"
                type="string"
                disabled
                label="VALOR TOTAL"
                value={valorTotal}
              />
            </CtInternoCampos>
          </CtCamposInferiores>
        </CtConteudoJanela>
      </Form>
    </CtPrincipalJanela>
  );
}
