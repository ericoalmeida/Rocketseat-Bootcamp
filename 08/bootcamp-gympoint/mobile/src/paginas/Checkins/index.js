import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  CtConteudo,
  CtButton,
  BtCheckin,
  CtNumeroCheckIns,
  CtCarregandoNumeroCheckIns,
  TxNumeroCheckIns,
  CtListaVazia,
  TxListaVazia,
  CtLista,
  FlLista,
} from './styles';
import Header from '~/components/Header';
import Checkin from '~/components/CheckIn';

import api from '~/servicos/api';

export default function Checkins() {
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [efetuandoCheckin, setEfetuandoCheckin] = useState(false);

  const [totalCheckins, setTotalCheckins] = useState(0);

  const alunoId = useSelector(state => state.aluno.aluno.id);

  async function enviarDadosAlunoParaCheckin() {
    try {
      setEfetuandoCheckin(true);
      await api.post(`/alunos/${alunoId}/frequencia`);

      setEfetuandoCheckin(false);
    } catch (error) {
      Alert.alert('Falha', 'Não foi possível conectar ao servidor');
    }
  }

  async function carregarInformacoesApi() {
    setCarregando(true);

    const [listaCheckins, checkinsTotal] = await Promise.all([
      api.get(`/alunos/${alunoId}/frequencia`),
      api.get(`/aluno/${alunoId}/frequencia/totalfrequencia`),
    ]);

    setLista(listaCheckins.data);
    setTotalCheckins(checkinsTotal.data.total);

    setCarregando(false);
  }

  function atualizarListagem() {
    carregarInformacoesApi();
  }

  function efetuarCheckin() {
    if (totalCheckins === 5) {
      Alert.alert('Aviso', 'Você ja atingiu o limite da semana');
      return;
    }

    enviarDadosAlunoParaCheckin();
  }

  useEffect(() => {
    carregarInformacoesApi();
  }, [efetuandoCheckin, alunoId]);

  return (
    <Container>
      <Header />
      <CtConteudo>
        <CtButton>
          <BtCheckin loading={efetuandoCheckin} onPress={efetuarCheckin}>
            Novo Check-in
          </BtCheckin>
        </CtButton>

        <CtNumeroCheckIns>
          {carregando ? (
            <CtCarregandoNumeroCheckIns />
          ) : (
            <TxNumeroCheckIns>
              Número de Check-ins da semana: {totalCheckins}
            </TxNumeroCheckIns>
          )}
        </CtNumeroCheckIns>

        {!carregando && lista.length === 0 ? (
          <CtListaVazia>
            <Icon name="do-not-disturb" size={30} color="#a4a4a4" />
            <TxListaVazia>Você não fez nenhum check-in</TxListaVazia>
          </CtListaVazia>
        ) : (
          <CtLista>
            {carregando ? (
              <ActivityIndicator color="#a4a4a4" size="large" />
            ) : (
              <FlLista
                data={lista}
                onRefresh={atualizarListagem}
                refreshing={carregando}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => <Checkin data={item} />}
              />
            )}
          </CtLista>
        )}
      </CtConteudo>
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={25} color={tintColor} />
  ),
};
