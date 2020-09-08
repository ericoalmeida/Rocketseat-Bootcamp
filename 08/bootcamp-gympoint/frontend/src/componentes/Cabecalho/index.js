import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, ContainerLogo, Conteudo, Perfil } from './styles';

import logo from '~/arquivos/logotipo.png';
import { sairDoSistema } from '~/loja/modulos/autenticacao/acoes';

export default function Cabecalho() {
  const perfil = useSelector(state => state.usuario.perfil);
  const executar = useDispatch();

  function sair() {
    executar(sairDoSistema());
  }

  return (
    <Container>
      <ContainerLogo>
        <img src={logo} alt="gymPoint" />
        <strong>GYMPOINT</strong>
      </ContainerLogo>

      <Conteudo>
        <nav>
          <Link to="/">INICIO</Link>
          <Link to="/alunos">ALUNOS</Link>
          <Link to="/planos">PLANOS</Link>
          <Link to="/matricula">MATRÍCULAS</Link>
          <Link to="/ordemservico">PEDIDOS DE AUXÍLIO</Link>
        </nav>
      </Conteudo>

      <aside>
        <Perfil>
          <Link to="/perfil">
            <strong>{perfil.nome}</strong>
          </Link>
          <button type="button" onClick={sair}>
            Sair do Sistema
          </button>
        </Perfil>
      </aside>
    </Container>
  );
}
