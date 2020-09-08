import React from 'react';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, ImLogo, SbSair } from './styles';
import logo from '~/arquivos/logotipo.png';

import { sairDoSistema } from '~/loja/modulos/autenticacao/acoes';

export default function Header() {
  const executar = useDispatch();

  function efetuarLogout() {
    executar(sairDoSistema());
  }

  return (
    <Container>
      <ImLogo source={logo} />
      <SbSair onPress={efetuarLogout}>
        <Icon name="exit-to-app" size={26} color="#ee4d64" />
      </SbSair>
    </Container>
  );
}
