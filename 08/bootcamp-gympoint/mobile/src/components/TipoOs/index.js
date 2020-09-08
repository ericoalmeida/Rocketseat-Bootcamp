import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { Container, TipoOsButton, TxTipoOsButton, CtIcone } from './styles';

export default function TipoOs({ data, navigation }) {
  return (
    <Container>
      <TipoOsButton onPress={() => navigation.navigate('NovaOs', { data })}>
        <CtIcone>
          <Icon name="dehaze" size={25} color="#999" />
          <TxTipoOsButton>{data.descricao}</TxTipoOsButton>
        </CtIcone>

        <Icon name="chevron-right" size={25} color="#d9d9d9" />
      </TipoOsButton>
    </Container>
  );
}

TipoOs.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
