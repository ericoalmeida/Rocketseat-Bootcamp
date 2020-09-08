import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { Container, TxButton } from './styles';

export default function Button({ children, loading, ...restante }) {
  return (
    <Container {...restante}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <TxButton>{children}</TxButton>
      )}
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
