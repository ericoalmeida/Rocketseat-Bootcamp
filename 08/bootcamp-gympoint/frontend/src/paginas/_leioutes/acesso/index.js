import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function LeiouteAcesso({ children }) {
  return <Container>{children}</Container>;
}

LeiouteAcesso.propTypes = {
  children: PropTypes.element.isRequired,
};
