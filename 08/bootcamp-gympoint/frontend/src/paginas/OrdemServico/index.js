import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  MdSearch,
  MdNotInterested,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdCreate,
  MdCheckCircle,
  MdYoutubeSearchedFor,
  MdAssignment,
} from 'react-icons/md';

import {
  modalStyles,
  Container,
  CtPerguntaOs,
  CtResponstaTituloOs,
  CtRespostaOs,
  CtBotoesOs,
  CtPerguntaTituloOs,
  CtConteudoOs,
} from './styles';

import {
  CtPrincipal,
  CtCabecalho,
  CtTitulo,
  CtConsulta,
  CtNumeroRegistrosPagina,
  CtBusca,
  CtRodape,
  CtPaginacao,
  CtContadorRegistros,
  CtConteudo,
  CtNenhumRegistro,
  CtAcoes,
} from '~/componentes/Containers';

import { TbListagem } from '~/componentes/Tabelas';
import CarregandoPagina from '~/componentes/CarregandoPagina';

import {
  SbLocalizar,
  SbLimparFiltro,
  SbPaginaAnterior,
  SbProximaPagina,
  SbResponder,
  SbVisualizar,
  SbTipoOrdemServico,
} from '~/componentes/Botoes';

import { proximaPagina, paginaAnterior } from '~/util/paginacao';
import historico from '~/servicos/historico';

import {
  SlRegistrosPorPagina,
  SlExibirRegistros,
} from '~/componentes/Selecione';

import { InCampoFiltro } from '~/componentes/CamposTexto';

import {
  carregarLista,
  totalizarOrdemServico,
  localizarOrdemServico,
  alterarOrdemServico,
} from '~/loja/modulos/ordemServico/acoes';

import { acaoUpdate, acaoRecover } from '~/util/acoes';

const esquemaValidacao = Yup.object().shape({
  retorno: Yup.string().required('Informe um resposta para o aluno'),
});

export default function OrdemServico() {
  const executar = useDispatch();

  const lista = useSelector(state => state.ordemServico.lista);
  const carregando = useSelector(state => state.ordemServico.carregando);
  const totalRegistros = useSelector(
    state => state.ordemServico.totalRegistros
  );
  const acao = useSelector(state => state.ordemServico.acao);
  const ordemServico = useSelector(state => state.ordemServico.ordemServico);

  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [filtro, setFiltro] = useState('');
  const [resolvido, setResolvido] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);

  const [textoFiltro, setTextFiltro] = useState('');

  function statusOrdensServico(e) {
    setResolvido(e.target.value);
  }

  function limiteRegistroPagina(e) {
    setLimite(Number(e.target.value));
  }

  function textoFiltroRegistros(e) {
    setTextFiltro(e.target.value);
  }

  function filtrarRegistros() {
    setFiltro(textoFiltro);
  }

  function limparFiltroRegistros() {
    setFiltro('');
    setTextFiltro('');
  }

  function localizarDadosOrdemServico(acaoAtual, ordemServicoId) {
    executar(localizarOrdemServico(acaoAtual, ordemServicoId));
    setModalAberto(true);
  }

  function fecharJanelaModal() {
    setModalAberto(false);
  }

  function enviarDadosOrdemServico(data) {
    switch (acao) {
      case acaoUpdate: {
        executar(alterarOrdemServico({ id: ordemServico.id, ...data }));
        setTimeout(setModalAberto(false), 3000);

        break;
      }

      default:
    }
  }

  useEffect(() => {
    executar(carregarLista(pagina, limite, filtro, resolvido));
    executar(totalizarOrdemServico(pagina, limite, filtro, resolvido));
  }, [pagina, limite, filtro, resolvido, modalAberto, executar]);

  return (
    <CtPrincipal>
      {carregando ? (
        <CarregandoPagina />
      ) : (
        <>
          <Modal isOpen={modalAberto} style={modalStyles}>
            <Form
              initialData={ordemServico}
              onSubmit={enviarDadosOrdemServico}
              schema={esquemaValidacao}
            >
              <Container>
                <CtConteudoOs>
                  <CtPerguntaTituloOs>
                    <span id="labelOs">PERGUNTA DO ALUNO:</span>
                    <strong>
                      {ordemServico && `#${ordemServico.aluno.nome}`}
                    </strong>
                  </CtPerguntaTituloOs>
                  <CtPerguntaOs>
                    <p>{ordemServico && ordemServico.solicitacao}</p>
                  </CtPerguntaOs>
                </CtConteudoOs>

                <CtConteudoOs>
                  <CtResponstaTituloOs>
                    <span id="labelOs">SUA RESPOSTA</span>
                  </CtResponstaTituloOs>
                  <CtRespostaOs>
                    <Input
                      name="retorno"
                      placeholder="Sua resposta"
                      multiline
                      disabled={acao === acaoRecover}
                    />
                  </CtRespostaOs>
                </CtConteudoOs>

                <CtBotoesOs>
                  <button
                    id="SbVoltar"
                    type="button"
                    onClick={() => fecharJanelaModal()}
                  >
                    <span>Voltar</span>
                  </button>

                  {acao === acaoUpdate && (
                    <button type="submit">
                      <span>Responder Aluno</span>
                    </button>
                  )}
                </CtBotoesOs>
              </Container>
            </Form>
          </Modal>

          <CtCabecalho>
            <CtTitulo>
              <span>Gerenciando Pedidos de Auxílio</span>
            </CtTitulo>
            <CtAcoes>
              <SbTipoOrdemServico
                type="button"
                onClick={() => historico.push('/tipoordemservico')}
              >
                <MdAssignment size={20} />
                <span>TIPOS DE AUXÍLIO</span>
              </SbTipoOrdemServico>
            </CtAcoes>
            <CtConsulta>
              <CtNumeroRegistrosPagina>
                <span>Mostrar</span>
                <SlRegistrosPorPagina
                  value={limite}
                  onChange={limiteRegistroPagina}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </SlRegistrosPorPagina>
                <span>registros</span>
              </CtNumeroRegistrosPagina>
              <CtNumeroRegistrosPagina>
                <span>Mostrar</span>
                <SlExibirRegistros
                  value={resolvido}
                  onChange={statusOrdensServico}
                >
                  <option value={false}>Pendentes</option>
                  <option value>Finalizados</option>
                </SlExibirRegistros>
              </CtNumeroRegistrosPagina>
              <CtBusca>
                <span>Buscar</span>
                <InCampoFiltro
                  type="text"
                  placeholder="Nome do Aluno"
                  onChange={textoFiltroRegistros}
                  value={textoFiltro}
                />
                <SbLocalizar onClick={filtrarRegistros}>
                  <MdSearch size={20} />
                </SbLocalizar>

                <SbLimparFiltro onClick={limparFiltroRegistros}>
                  <MdNotInterested size={20} />
                </SbLimparFiltro>
              </CtBusca>
            </CtConsulta>
          </CtCabecalho>

          <CtConteudo>
            {lista.length === 0 ? (
              <CtNenhumRegistro>
                <span>Nenhum registro encontrado</span>
              </CtNenhumRegistro>
            ) : (
              <TbListagem>
                <thead>
                  <th width={30} align="center">
                    CÓDIGO
                  </th>
                  <th align="left">ALUNO</th>
                  <th align="left">TIPOS DE AUXÍLIO</th>
                  <th width={30} align="center">
                    SITUAÇÃO
                  </th>
                  <th width={30} />
                </thead>
                <tbody>
                  {lista.map(item => (
                    <tr>
                      <td align="center">{item.id}</td>
                      <td align="left">{item.aluno.nome}</td>
                      <td align="left">{item.tipo_ordem.descricao}</td>
                      <td align="center">
                        {item.resolvido ? (
                          <MdCheckCircle size={20} color="#93ed87" />
                        ) : (
                          <MdCheckCircle size={20} color="#c1cad6" />
                        )}
                      </td>
                      <td align="center">
                        {item.resolvido ? (
                          <SbVisualizar
                            type="button"
                            onClick={() =>
                              localizarDadosOrdemServico(acaoRecover, item.id)
                            }
                          >
                            <MdYoutubeSearchedFor size={20} />
                            <span>Visualizar</span>
                          </SbVisualizar>
                        ) : (
                          <SbResponder
                            type="button"
                            onClick={() =>
                              localizarDadosOrdemServico(acaoUpdate, item.id)
                            }
                          >
                            <MdCreate size={20} />
                            <span>Responder</span>
                          </SbResponder>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </TbListagem>
            )}
          </CtConteudo>
          <CtRodape>
            <CtContadorRegistros>
              <span>
                Exibindo {lista.length} de {totalRegistros} registro(s)
              </span>
            </CtContadorRegistros>
            <CtPaginacao>
              <SbPaginaAnterior
                onClick={() => setPagina(paginaAnterior(pagina))}
                disabled={pagina === 1}
              >
                <MdKeyboardArrowLeft size={21} color="#777" />
              </SbPaginaAnterior>

              <div>{pagina}</div>

              <SbProximaPagina
                onClick={() => setPagina(proximaPagina(pagina))}
                disabled={lista.length === 0}
              >
                <MdKeyboardArrowRight size={21} color="#777" />
              </SbProximaPagina>
            </CtPaginacao>
          </CtRodape>
        </>
      )}
    </CtPrincipal>
  );
}
