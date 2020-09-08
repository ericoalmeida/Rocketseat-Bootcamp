import React from 'react';

import { Container, ImLogo } from './styles';
import logo from '~/arquivos/logotipo.png';

export default function HeaderOs() {
  return (
    <Container>
      <ImLogo source={logo} />
    </Container>
  );
}
