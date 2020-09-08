import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TiInput } from './styles';

function Input({ style, icon, ...restante }, ref) {
  return (
    <Container style={style}>
      {icon && <Icon name={icon} size={20} color="#c1cad6" />}
      <TiInput {...restante} ref={ref} />
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default forwardRef(Input);
