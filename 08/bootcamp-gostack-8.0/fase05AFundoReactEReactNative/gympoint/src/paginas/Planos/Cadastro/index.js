import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

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

import { formatPrice } from '~/util/format';
import acaoAtual from '~/util/acaoAtual';
import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

import historico from '~/servicos/historico';

import {
  incluirPlano,
  alterarPlano,
  excluirPlano,
} from '~/loja/modulos/plano/acoes';

const esquemaValidacao = Yup.object().shape({
  id: Yup.number(),
  titulo: Yup.string().required('Titulo é um campo obrigatório'),
  duracao: Yup.number().required('Duração é um campo obrigatório'),
  preco: Yup.number()
    .min(1, 'Valor do plano não pode ser 0 (Zero).')
    .required('Preço é um campo obrigatório'),
});

export default function CadPlanos() {
  const executar = useDispatch();
  const plano = useSelector(state => state.plano.plano);
  const acao = useSelector(state => state.plano.acao);

  const [duracao, setDuracao] = useState(1);
  const [preco, setPreco] = useState(0);

  function mudarDuracaoMeses(e) {
    setDuracao(e.target.value);
  }

  function mudarPreco(e) {
    setPreco(e.target.value);
  }

  function enviarDadosDoPlano(data) {
    switch (acao) {
      case acaoCreate: {
        executar(incluirPlano(data));
        break;
      }

      case acaoUpdate: {
        executar(alterarPlano({ id: plano.id, ...data }));
        break;
      }

      case acaoDelete: {
        executar(excluirPlano(plano.id));
        break;
      }
      default:
        break;
    }
  }

  const valorTotal = useMemo(() => formatPrice(parseFloat(duracao * preco)), [
    duracao,
    preco,
  ]);

  useEffect(() => {
    if (!plano) return;

    setDuracao(plano.duracao);
    setPreco(plano.preco);
  }, [plano]);

  return (
    <CtPrincipalJanela>
      <Form
        initialData={plano}
        onSubmit={enviarDadosDoPlano}
        schema={esquemaValidacao}
      >
        <CtCabecalhoJanela>
          <CtTituloJanela>
            <strong>Planos</strong>
            <span>{acaoAtual(acao)}</span>
          </CtTituloJanela>
          <CtBotoesJanela>
            <SBVoltar type="button" onClick={() => historico.push('/planos')}>
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
              name="titulo"
              placeholder="Titulo"
              label="TÍULO"
              disabled={acao === acaoDelete}
            />
          </CtCamposSuperiores>
          <CtCamposInferiores>
            <CtInternoCampos>
              <Input
                name="duracao"
                type="number"
                min="1"
                step="1"
                placeholder="Duração"
                label="DURAÇÃO"
                disabled={acao === acaoDelete}
                onChange={mudarDuracaoMeses}
                value={duracao}
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="preco"
                type="number"
                min="0.00"
                step="0.01"
                placeholder="Preço Mensal"
                onChange={mudarPreco}
                value={preco}
                disabled={acao === acaoDelete}
                label="PREÇO MENSAL (R$)"
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="preco_total"
                placeholder="Preço Total"
                disabled
                value={valorTotal}
                label="PREÇO TOTAL"
              />
            </CtInternoCampos>
          </CtCamposInferiores>
        </CtConteudoJanela>
      </Form>
    </CtPrincipalJanela>
  );
}
