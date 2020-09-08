import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  MdKeyboardArrowLeft,
  MdDeleteForever,
  MdDoneAll,
} from 'react-icons/md';

import {
  CtPrincipalJanela,
  CtCabecalhoJanela,
  CtConteudoJanela,
  CtCamposSuperiores,
  CtBotoesJanela,
  CtTituloJanela,
} from '~/componentes/Containers';

import { SBSalvar, SBVoltar } from '~/componentes/Botoes';

import { acaoCreate, acaoDelete, acaoUpdate } from '~/util/acoes';

import historico from '~/servicos/historico';
import {
  incluirTipoOrdemServico,
  alterarTipoOrdemServico,
  excluirTipoOrdemServico,
} from '~/loja/modulos/tipoOrdemServico/acoes';

const esquemaValidacao = Yup.object().shape({
  descricao: Yup.string().required('Descrição é um campo obrigatório.'),
});

export default function CadTipoOrdemServico() {
  const executar = useDispatch();

  const acao = useSelector(state => state.tipoOrdemServico.acao);
  const tipoOrdemServico = useSelector(
    state => state.tipoOrdemServico.tipoOrdemServico
  );

  const [descricao, setDescricao] = useState('');

  function mudarDescricao(e) {
    setDescricao(e.target.value);
  }

  function enviarDadosDoTipoDeOrdemServico(data) {
    switch (acao) {
      case acaoCreate: {
        executar(incluirTipoOrdemServico(data));
        break;
      }

      case acaoUpdate: {
        executar(alterarTipoOrdemServico({ id: tipoOrdemServico.id, ...data }));
        break;
      }

      case acaoDelete: {
        executar(excluirTipoOrdemServico(tipoOrdemServico.id));
        break;
      }

      default:
    }
  }

  useEffect(() => {
    if (!tipoOrdemServico) return;

    setDescricao(tipoOrdemServico.descricao);
  }, [tipoOrdemServico]);

  return (
    <CtPrincipalJanela>
      <Form
        initialData={tipoOrdemServico}
        onSubmit={enviarDadosDoTipoDeOrdemServico}
        schema={esquemaValidacao}
      >
        <CtCabecalhoJanela>
          <CtTituloJanela>
            <strong>Tipos de Auxílio</strong>
            <span>Incluindo</span>
          </CtTituloJanela>
          <CtBotoesJanela>
            <SBVoltar
              type="button"
              onClick={() => historico.push('/tipoordemservico')}
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
            <Input
              name="descricao"
              placeholder="Descrição"
              label="DESCRIÇÃO"
              value={descricao}
              onChange={mudarDescricao}
              disabled={acao === acaoDelete}
            />
          </CtCamposSuperiores>
        </CtConteudoJanela>
      </Form>
    </CtPrincipalJanela>
  );
}
