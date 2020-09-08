import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Container,
  CtConteudo,
  CtFooter,
  CtSolicitacao,
  SbEnviar,
  CtTipo,
  TxSolicitacao,
  TxTipoAuxilio,
  TxDescricao,
} from './styles';

import HeaderOs from '~/components/HeaderOs';
import api from '~/servicos/api';

export default function NovaOs({ navigation }) {
  const alunoId = useSelector(state => state.aluno.aluno.id);

  const tipoOrdemServico = navigation.getParam('data');
  const [solicitacao, setSolicitacao] = useState('');

  async function enviarDadosAlunoParaCheckin() {
    try {
      await api.post(`/aluno/${alunoId}/ordemservico`, {
        tipo_ordem_id: tipoOrdemServico.id,
        solicitacao,
      });
    } catch (error) {
      Alert.alert('Falha', 'Não foi possível conectar ao servidor');
    }
  }

  function enviarDadosOrdemServico() {
    if (solicitacao === '') {
      Alert.alert('Descreva seu pedido de auxílio');
      return;
    }

    enviarDadosAlunoParaCheckin();

    navigation.navigate('OrdemServico');
  }

  return (
    <Container>
      <HeaderOs />
      <CtConteudo>
        <CtSolicitacao>
          <CtTipo>
            <TxDescricao>Solicitando auxílio para </TxDescricao>
            <TxTipoAuxilio>{`#${tipoOrdemServico.descricao}`}</TxTipoAuxilio>
          </CtTipo>
          <TxSolicitacao
            multiline
            placeholder="Descreva seu pedido de auxílio"
            textAlignVertical="top"
            maxLength={255}
            value={solicitacao}
            onChangeText={setSolicitacao}
          />
        </CtSolicitacao>
        <CtFooter>
          <SbEnviar onPress={() => enviarDadosOrdemServico()}>
            Enviar Pedido
          </SbEnviar>
        </CtFooter>
      </CtConteudo>
    </Container>
  );
}

NovaOs.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('TipoOrdemServico');
      }}
    >
      <Icon name="chevron-left" size={25} color="#ee4d64" />
    </TouchableOpacity>
  ),
});

NovaOs.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
