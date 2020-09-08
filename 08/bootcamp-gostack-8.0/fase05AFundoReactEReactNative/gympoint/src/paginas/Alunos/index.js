import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  MdAdd,
  MdCreate,
  MdDelete,
  MdSearch,
  MdNotInterested,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';

import CarregandoPagina from '~/componentes/CarregandoPagina';

import { TbListagem } from '~/componentes/Tabelas';
import { SlRegistrosPorPagina } from '~/componentes/Selecione';
import { InCampoFiltro } from '~/componentes/CamposTexto';

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
  SbPaginaAnterior,
  SbProximaPagina,
} from '~/componentes/Botoes';

import { proximaPagina, paginaAnterior } from '~/util/paginacao';
import { acaoCreate, acaoUpdate, acaoDelete } from '~/util/acoes';

import {
  carregarLista,
  cadastrarAluno,
  localizarAluno,
  totalizarAlunos,
} from '~/loja/modulos/aluno/acoes';

export default function Alunos() {
  const executar = useDispatch();

  const lista = useSelector(state => state.aluno.lista);
  const carregando = useSelector(state => state.aluno.carregando);
  const totalRegistros = useSelector(state => state.aluno.totalRegistros);

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
    executar(totalizarAlunos(pagina, limite, filtro));
  }, [limite, pagina, filtro, executar]);

  return (
    <CtPrincipal>
      {carregando ? (
        <CarregandoPagina />
      ) : (
        <>
          <CtCabecalho>
            <CtTitulo>
              <span>Gerenciando Alunos</span>
            </CtTitulo>
            <CtAcoes>
              <SbIncluir
                type="button"
                onClick={() => executar(cadastrarAluno(acaoCreate))}
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
                  <th align="left">NOME</th>
                  <th align="left">E-MAIL</th>
                  <th align="center">IDADE</th>
                  <th width={30} />
                  <th width={30} />
                </thead>
                <tbody>
                  {lista.map(aluno => (
                    <tr>
                      <td align="center">{aluno.id}</td>
                      <td align="left">{aluno.nome}</td>
                      <td align="left">{aluno.email}</td>
                      <td align="center">{`${aluno.idade} Anos`}</td>
                      <td align="center">
                        <SbEditar
                          type="button"
                          onClick={() =>
                            executar(localizarAluno(acaoUpdate, aluno.id))
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
                            executar(localizarAluno(acaoDelete, aluno.id))
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
