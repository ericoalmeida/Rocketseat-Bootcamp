import React from 'react';
import {
  MdPeople,
  MdPlaylistAdd,
  MdHelp,
  MdLibraryBooks,
} from 'react-icons/md';

import { ContainerBotoes, ContainerLogo, ContainerInicio } from './styles';

import historico from '~/servicos/historico';

import logo from '~/arquivos/logo.png';

import { CtPrincipal, CtConteudo } from '~/componentes/Containers';

export default function Inicio() {
  return (
    <CtPrincipal>
      <CtConteudo>
        <ContainerInicio>
          <ContainerLogo>
            <img src={logo} alt="logo" />
          </ContainerLogo>
          <ContainerBotoes>
            <button type="button" onClick={() => historico.push('/alunos')}>
              <MdPeople color="#fff" size={40} />
              <span>ALUNOS</span>
            </button>

            <button type="button" onClick={() => historico.push('/planos')}>
              <MdPlaylistAdd color="#fff" size={40} />
              <span>PLANOS</span>
            </button>
          </ContainerBotoes>

          <ContainerBotoes>
            <button type="button" onClick={() => historico.push('/matricula')}>
              <MdLibraryBooks color="#fff" size={40} />
              <span>MATRÍCULAS</span>
            </button>
            <button
              type="button"
              onClick={() => historico.push('/ordemservico')}
            >
              <MdHelp color="#fff" size={40} />
              <span>PEDIDOS DE AUXÍLIO</span>
            </button>
          </ContainerBotoes>
        </ContainerInicio>
      </CtConteudo>
    </CtPrincipal>
  );
}
