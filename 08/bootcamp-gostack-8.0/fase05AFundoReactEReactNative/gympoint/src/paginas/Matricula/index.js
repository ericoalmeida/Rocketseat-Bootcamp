import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdCreate,
  MdDelete,
  MdAdd,
  MdSearch,
  MdNotInterested,
  MdCheckCircle,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

import CarregandoPagina from '~/componentes/CarregandoPagina';

import { TbListagem } from '~/componentes/Tabelas';
import { SlRegistrosPorPagina } from '~/componentes/Selecione';
import { InCampoFiltro } from '~/componentes/CamposTexto';

import {
  CtPrincipal,
  CtPaginacao,
  CtCabecalho,
  CtTitulo,
  CtNenhumRegistro,
  CtContadorRegistros,
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
  localizarMatricula,
  cadastrarMatricula,
  totalizarMatriculas,
} from '~/loja/modulos/matricula/acoes';

import { formatarSomenteDataExtenso } from '~/util/format';
import { paginaAnterior, proximaPagina } from '~/util/paginacao';
import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

export default function Matricula() {
  const executar = useDispatch();

  const lista = useSelector(state => state.matricula.lista);
  const carregando = useSelector(state => state.matricula.carregando);
  const totalRegistros = useSelector(state => state.matricula.totalRegistros);

  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);
  const [filtro, setFiltro] = useState('');

  const [textoFiltro, setTextoFiltro] = useState(' ');

  function textoFiltroRegistros(e) {
    setTextoFiltro(e.target.value);
  }

  function filtrarRegistros() {
    setFiltro(textoFiltro);
  }

  function limparFiltroRegistros() {
    setFiltro('');
    setTextoFiltro('');
  }

  function limiteRegistrosPorPagina(e) {
    setLimite(Number(e.target.value));
  }

  useEffect(() => {
    executar(carregarLista(pagina, limite, filtro));
    executar(totalizarMatriculas(pagina, limite, filtro));
  }, [filtro, pagina, limite, executar]);

  return (
    <CtPrincipal>
      {carregando ? (
        <CarregandoPagina />
      ) : (
        <>
          <CtCabecalho>
            <CtTitulo>
              <span>Gerenciando Matrículas</span>
            </CtTitulo>
            <CtAcoes>
              <SbIncluir
                onClick={() => executar(cadastrarMatricula(acaoCreate))}
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
                  onChange={limiteRegistrosPorPagina}
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
                  <th align="center">PLANO</th>
                  <th align="center">INICIO</th>
                  <th align="center">TÉRMINO</th>
                  <th align="center">ATIVO</th>
                  <th width={30} />
                  <th width={30} />
                </thead>
                <tbody>
                  {lista.map(matricula => (
                    <tr>
                      <td align="center">{matricula.id}</td>
                      <td align="left">{matricula.aluno.nome}</td>
                      <td align="center">{matricula.plano.titulo}</td>
                      <td align="center">
                        {formatarSomenteDataExtenso(matricula.data_inicio)}
                      </td>
                      <td align="center">
                        {formatarSomenteDataExtenso(matricula.data_termino)}
                      </td>
                      <td align="center">
                        {matricula.ativa ? (
                          <MdCheckCircle size={20} color="#93ed87" />
                        ) : (
                          <MdCheckCircle size={20} color="#c1cad6" />
                        )}
                      </td>
                      <td align="center">
                        <SbEditar
                          type="button"
                          onClick={() =>
                            executar(
                              localizarMatricula(acaoUpdate, matricula.id)
                            )
                          }
                        >
                          <MdCreate size={20} />
                          <span>Editar</span>
                        </SbEditar>
                      </td>
                      <td align="center">
                        <SbExcluir
                          onClick={() =>
                            executar(
                              localizarMatricula(acaoDelete, matricula.id)
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
