import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Notifications from '~/components/Notifications';

import logo from '~/assets/logo-purple.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const perfil = useSelector(state => state.usuario.perfil);
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="goBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />
          <Profile>
            <div>
              <strong>{perfil.nome}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src={
                perfil.avatar.url ||
                'https://api.adorable.io/avatars/50/develop@adorable.io.png'
              }
              alt={perfil.nome}
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
