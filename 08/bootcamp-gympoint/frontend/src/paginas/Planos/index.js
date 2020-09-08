import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdCreate,
  MdDelete,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdAdd,
  MdSearch,
  MdNotInterested,
} from 'react-icons/md';

import CarregandoPagina from '~/componentes/CarregandoPagina';

import { TbListagem } from '~/componentes/Tabelas';
import { SlRegistrosPorPagina } from '~/componentes/Selecione';
import { InCampoFiltro } from '~/componentes/CamposTexto';

import {
  CtPrincipal,
  CtCabecalho,
  CtTitulo,
  CtNenhumRegistro,
  CtContadorRegistros,
  CtPaginacao,
  CtBusca,
  CtAcoes,
  CtConteudo,
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
  SbPaginaAnterior,
  SbProximaPagina,
} from '~/componentes/Botoes';

import {
  carregarLista,
  localizarPlano,
  cadastrarPlano,
  totalizarPlanos,
} from '~/loja/modulos/plano/acoes';

import { proximaPagina, paginaAnterior } from '~/util/paginacao';
import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

export default function Planos() {
  const executar = useDispatch();

  const lista = useSelector(state => state.plano.lista);
  const carregando = useSelector(state => state.plano.carregando);
  const totalRegistros = useSelector(state => state.plano.totalRegistros);

  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [filtro, setFiltro] = useState('');

  const [textoFiltro, setTextoFiltro] = useState('');

  function limiteRegistroPagina(e) {
    setLimite(Number(e.target.value));
  }

  function filtrarRegistros() {
    setFiltro(textoFiltro);
  }

  function limparFiltroRegistros() {
    setFiltro('');
    setTextoFiltro('');
  }

  function textoFiltroRegistros(e) {
    setTextoFiltro(e.target.value);
  }

  useEffect(() => {
    executar(carregarLista(pagina, limite, filtro));
    executar(totalizarPlanos(pagina, limite, filtro));
  }, [pagina, limite, filtro, executar]);

  return (
    <CtPrincipal>
      {carregando ? (
        <CarregandoPagina />
      ) : (
        <>
          <CtCabecalho>
            <CtTitulo>
              <span>Gerenciando Planos</span>
            </CtTitulo>
            <CtAcoes>
              <SbIncluir
                type="button"
                onClick={() => executar(cadastrarPlano(acaoCreate))}
              >
                <MdAdd size={20} color="#fff" />
                <span>CADASTRAR</span>
              </SbIncluir>
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
                  placeholder="Nome do plano"
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
                  <th align="left">TÍTULO</th>
                  <th align="center">DURAÇÃO</th>
                  <th align="center">PREÇO MENSAL</th>
                  <th align="center">PREÇO TOTAL</th>
                  <th width={30} />
                  <th width={30} />
                </thead>
                <tbody>
                  {lista.map(plano => (
                    <tr>
                      <td align="center">{plano.id}</td>
                      <td align="left">{plano.titulo}</td>
                      <td align="center">
                        {plano.duracao}
                        {plano.duracao === 1 ? ' Mês' : ' Meses'}
                      </td>
                      <td align="center">{plano.preco_formatado}</td>
                      <td align="center">{plano.preco_total_formatado}</td>
                      <td align="center">
                        <SbEditar
                          type="button"
                          onClick={() =>
                            executar(localizarPlano(acaoUpdate, plano.id))
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
                            executar(localizarPlano(acaoDelete, plano.id))
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
              >
                <MdKeyboardArrowLeft size={21} color="#777" />
              </SbPaginaAnterior>

              <div>{pagina}</div>

              <SbProximaPagina onClick={() => setPagina(proximaPagina(pagina))}>
                <MdKeyboardArrowRight size={21} color="#777" />
              </SbProximaPagina>
            </CtPaginacao>
          </CtRodape>
        </>
      )}
    </CtPrincipal>
  );
}
