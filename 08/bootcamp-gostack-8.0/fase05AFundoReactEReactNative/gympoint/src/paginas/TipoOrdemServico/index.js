import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdNotInterested,
  MdSearch,
  MdAdd,
  MdAssignment,
  MdCreate,
  MdDelete,
} from 'react-icons/md';

import {
  CtPaginacao,
  CtPrincipal,
  CtTitulo,
  CtNenhumRegistro,
  CtContadorRegistros,
  CtConteudo,
  CtCabecalho,
  CtBusca,
  CtAcoes,
  CtConsulta,
  CtNumeroRegistrosPagina,
  CtRodape,
} from '~/componentes/Containers';

import {
  SbLocalizar,
  SbLimparFiltro,
  SbIncluir,
  SbEditar,
  SbExcluir,
  SbOrdemServico,
  SbPaginaAnterior,
  SbProximaPagina,
} from '~/componentes/Botoes';

import { InCampoFiltro } from '~/componentes/CamposTexto';

import { paginaAnterior, proximaPagina } from '~/util/paginacao';
import historico from '~/servicos/historico';

import CarregandoPagina from '~/componentes/CarregandoPagina';
import { TbListagem } from '~/componentes/Tabelas';
import { SlRegistrosPorPagina } from '~/componentes/Selecione';

import {
  carregarLista,
  cadastrarTipoOrdemServico,
  localizarTipoOrdemServico,
  totalizarTipoOrdemServico,
} from '~/loja/modulos/tipoOrdemServico/acoes';

import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

export default function TipoOrdemServico() {
  const executar = useDispatch();

  const lista = useSelector(state => state.tipoOrdemServico.lista);
  const carregando = useSelector(state => state.tipoOrdemServico.carregando);
  const totalRegistros = useSelector(
    state => state.tipoOrdemServico.totalRegistros
  );

  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [filtro, setFiltro] = useState('');

  const [textoFiltro, setTextFiltro] = useState('');

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

  useEffect(() => {
    executar(carregarLista(pagina, limite, filtro));
    executar(totalizarTipoOrdemServico(pagina, limite, filtro));
  }, [pagina, limite, filtro, executar]);

  return (
    <CtPrincipal>
      {carregando ? (
        <CarregandoPagina />
      ) : (
        <>
          <CtCabecalho>
            <CtTitulo>
              <span>Gerenciando Tipos de Auxílio</span>
            </CtTitulo>
            <CtAcoes>
              <SbIncluir
                onClick={() => executar(cadastrarTipoOrdemServico(acaoCreate))}
              >
                <MdAdd size={20} color="#fff" />
                <span>CADASTRAR</span>
              </SbIncluir>
              <SbOrdemServico
                type="button"
                onClick={() => historico.push('/ordemservico')}
              >
                <MdAssignment size={20} />

                <span>PEDIDOS DE AUXÍLIO</span>
              </SbOrdemServico>
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
              <CtBusca>
                <span>Buscar</span>
                <InCampoFiltro
                  type="text"
                  placeholder="Nome do aluno"
                  onChange={textoFiltroRegistros}
                  value={textoFiltro}
                />
                <SbLocalizar type="button" onClick={() => filtrarRegistros()}>
                  <MdSearch size={20} />
                </SbLocalizar>

                <SbLimparFiltro
                  type="button"
                  onClick={() => limparFiltroRegistros()}
                >
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
                  <th align="left">DESCRIÇÃO</th>
                  <th width={30} />
                  <th width={30} />
                </thead>
                <tbody>
                  {lista.map(tipoOrdemServico => (
                    <tr>
                      <td align="center">{tipoOrdemServico.id}</td>
                      <td align="left">{tipoOrdemServico.descricao}</td>
                      <td align="center">
                        <SbEditar
                          type="button"
                          onClick={() =>
                            executar(
                              localizarTipoOrdemServico(
                                acaoUpdate,
                                tipoOrdemServico.id
                              )
                            )
                          }
                        >
                          <MdCreate size={20} />
                          <span>Editar</span>
                        </SbEditar>
                      </td>
                      <td align="center">
                        <SbExcluir
                          type="button"
                          onClick={() =>
                            executar(
                              localizarTipoOrdemServico(
                                acaoDelete,
                                tipoOrdemServico.id
                              )
                            )
                          }
                        >
                          <MdDelete size={20} />
                          <span>Excluir</span>
                        </SbExcluir>
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
