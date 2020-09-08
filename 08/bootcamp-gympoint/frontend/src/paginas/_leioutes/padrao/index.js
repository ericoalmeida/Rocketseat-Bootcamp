import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';
import Cabecalho from '~/componentes/Cabecalho';

export default function LeioutePadrao({ children }) {
  return (
    <Container>
      <Cabecalho />
      {children}
    </Container>
  );
}

LeioutePadrao.propTypes = {
  children: PropTypes.element.isRequired,
};
