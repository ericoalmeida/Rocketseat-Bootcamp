import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  CtConteudo,
  CtTitulo,
  TxTitulo,
  CtLista,
  FlLista,
  CtListaVazia,
  TxListaVazia,
} from './styles';

import HeaderOs from '~/components/HeaderOs';
import TipoOs from '~/components/TipoOs';

import api from '~/servicos/api';

export default function TipoOrdemServico({ navigation }) {
  const [lista, setLista] = useState([]);

  async function carregarInformacoesApi() {
    try {
      const response = await api.get('tipoordem');

      setLista(response.data);
    } catch (error) {
      Alert.alert('Falha', 'Não foi possível conectar ao servidor!');
    }
  }

  useEffect(() => {
    carregarInformacoesApi();
  }, []);

  return (
    <Container>
      <HeaderOs />
      <CtConteudo>
        <CtTitulo>
          <Icon name="cloud-done" size={25} color="#a4a4a4" />
          <TxTitulo>Selecione um tema para a solicitação</TxTitulo>
        </CtTitulo>

        {lista.length === 0 ? (
          <CtListaVazia>
            <TxListaVazia>Nenhum tipo de auxílio foi encontrado!</TxListaVazia>
            <TxListaVazia>Verifique na direção.</TxListaVazia>
          </CtListaVazia>
        ) : (
          <CtLista>
            <FlLista
              data={lista}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => (
                <TipoOs data={item} navigation={navigation} />
              )}
            />
          </CtLista>
        )}
      </CtConteudo>
    </Container>
  );
}

TipoOrdemServico.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('OrdemServico');
      }}
    >
      <Icon name="chevron-left" size={25} color="#ee4d64" />
    </TouchableOpacity>
  ),
});

TipoOrdemServico.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
