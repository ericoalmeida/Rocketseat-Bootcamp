import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import {
  MdKeyboardArrowLeft,
  MdDoneAll,
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

import historico from '~/servicos/historico';
import acaoAtual from '~/util/acaoAtual';

import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

import {
  incluirAluno,
  alterarAluno,
  excluirAluno,
} from '~/loja/modulos/aluno/acoes';

const esquemaValidacao = Yup.object().shape({
  id: Yup.number(),
  nome: Yup.string().required('Nome é um campo obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('E-mail é um campo obrigatório'),
  idade: Yup.number().required('Idade é um campo obrigatório'),
  peso: Yup.number()
    .min(1, 'Informe o peso do aluno')
    .required('Idade é um campo obrigatório'),
  altura: Yup.number()
    .min(1, 'Informe a Altura do aluno')
    .required('Idade é um campo obrigatório'),
});

export default function CadAlunos() {
  const executar = useDispatch();

  const acao = useSelector(state => state.aluno.acao);
  const aluno = useSelector(state => state.aluno.aluno);

  const [idade, setIdade] = useState(1);
  const [peso, setPeso] = useState(0);
  const [altura, setAltura] = useState(0);

  function mudarIdade(e) {
    setIdade(Number(e.target.value));
  }

  function mudarPeso(e) {
    setPeso(Number(e.target.value));
  }

  function mudarAltura(e) {
    setAltura(Number(e.target.value));
  }

  function enviarDadosDoAluno(data) {
    switch (acao) {
      case acaoCreate: {
        executar(incluirAluno(data));
        break;
      }

      case acaoUpdate: {
        executar(alterarAluno({ id: aluno.id, ...data }));
        break;
      }

      case acaoDelete: {
        executar(excluirAluno(aluno.id));
        break;
      }

      default:
        break;
    }
  }

  useEffect(() => {
    if (!aluno) return;

    setIdade(aluno.idade);
    setPeso(aluno.peso);
    setAltura(aluno.altura);
  }, [aluno]);

  return (
    <CtPrincipalJanela>
      <Form
        initialData={aluno}
        onSubmit={enviarDadosDoAluno}
        schema={esquemaValidacao}
      >
        <CtCabecalhoJanela>
          <CtTituloJanela>
            <strong>Alunos</strong>
            <span>{acaoAtual(acao)}</span>
          </CtTituloJanela>
          <CtBotoesJanela>
            <SBVoltar type="button" onClick={() => historico.push('/alunos')}>
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
            <Input
              name="nome"
              placeholder="Nome Completo"
              label="NOME COMPLETO"
              disabled={acao === acaoDelete}
            />

            <Input
              name="email"
              type="email"
              placeholder="exemplo@email.com.br"
              label="ENDEREÇO DE E-MAIL"
              disabled={acao === acaoDelete}
            />
          </CtCamposSuperiores>

          <CtCamposInferiores>
            <CtInternoCampos>
              <Input
                name="idade"
                type="number"
                min="0"
                step="1"
                placeholder="Sua Idade"
                label="IDADE"
                onChange={mudarIdade}
                value={idade}
                disabled={acao === acaoDelete}
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="peso"
                type="number"
                min="0.000"
                step="0.001"
                placeholder="Seu Peso"
                label="PESO (em Kg)"
                onChange={mudarPeso}
                value={peso}
                disabled={acao === acaoDelete}
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="altura"
                type="number"
                min="0.00"
                step="0.01"
                placeholder="Sua Altura"
                label="ALTURA"
                onChange={mudarAltura}
                value={altura}
                disabled={acao === acaoDelete}
              />
            </CtInternoCampos>
          </CtCamposInferiores>
        </CtConteudoJanela>
      </Form>
    </CtPrincipalJanela>
  );
}
