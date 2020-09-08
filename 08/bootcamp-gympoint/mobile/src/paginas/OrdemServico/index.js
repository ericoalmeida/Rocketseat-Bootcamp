import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import {
  Container,
  CtConteudo,
  CtButton,
  CtBtAtualizar,
  CtTotalOs,
  CtTotalSemResposta,
  CtTotalRespondida,
  BtCheckin,
  BtAtualizar,
  TxTotalSemResposta,
  TxTotalRespondida,
  CtLista,
  FlLista,
  CtListaVazia,
  TxListaVazia,
} from './styles';
import Header from '~/components/Header';

import OServico from '~/components/OServico';
import TotalSemResposta from '~/components/Carregando/TotalOS/TotalSemResposta';
import TotalRespondida from '~/components/Carregando/TotalOS/TotalRespondida';

import api from '~/servicos/api';

export default function OrdemServico({ navigation }) {
  const [carregando, setCarregando] = useState(true);
  const [totalSemResposta, setTotalSemResposta] = useState(0);
  const [totalRespondida, setTotalRespondida] = useState(0);

  const [lista, setLista] = useState([]);

  const alunoId = useSelector(state => state.aluno.aluno.id);

  async function carregarInformacoesApi() {
    setCarregando(true);

    const [listaOs, totalOsSemResposta, totalOsRespondida] = await Promise.all([
      api.get(`/aluno/${alunoId}/ordemservico`),

      api.get(`/aluno/${alunoId}/ordemservico/total`, {
        params: { resolvido: false },
      }),

      api.get(`/aluno/${alunoId}/ordemservico/total`, {
        params: { resolvido: true },
      }),
    ]);

    setLista(listaOs.data);
    setTotalSemResposta(totalOsSemResposta.data.total);
    setTotalRespondida(totalOsRespondida.data.total);

    setCarregando(false);
  }

  function iniciarNovaOrdemServico() {
    navigation.navigate('TipoOrdemServico');
  }

  function atualizandoLista() {
    carregarInformacoesApi();
  }

  useEffect(() => {
    carregarInformacoesApi();
  }, []);

  return (
    <Container>
      <Header />
      <CtConteudo>
        <CtButton>
          <BtCheckin onPress={() => iniciarNovaOrdemServico()}>
            Novo Pedido de Auxílio
          </BtCheckin>
        </CtButton>

        <CtTotalOs>
          {carregando ? (
            <TotalSemResposta />
          ) : (
            <CtTotalSemResposta>
              <Icon name="check-circle" size={20} color="#979797" />
              <TxTotalSemResposta>
                Sem Resposta: {totalSemResposta}
              </TxTotalSemResposta>
            </CtTotalSemResposta>
          )}

          {carregando ? (
            <TotalRespondida />
          ) : (
            <CtTotalRespondida>
              <Icon name="check-circle" size={20} color="#00e150" />
              <TxTotalRespondida>
                Respondido: {totalRespondida}
              </TxTotalRespondida>
            </CtTotalRespondida>
          )}
        </CtTotalOs>

        {!carregando && lista.length === 0 ? (
          <CtListaVazia>
            <Icon name="do-not-disturb" size={30} color="#a4a4a4" />
            <TxListaVazia>
              Você não solicitou nenhum pedido de auxílio
            </TxListaVazia>
            <CtBtAtualizar>
              <BtAtualizar onPress={() => atualizandoLista()}>
                Atualizar lista de pedidos
              </BtAtualizar>
            </CtBtAtualizar>
          </CtListaVazia>
        ) : (
          <CtLista>
            {carregando ? (
              <ActivityIndicator size="large" color="#a4a4a4" />
            ) : (
              <FlLista
                data={lista}
                keyExtractor={item => String(item.id)}
                onRefresh={atualizandoLista}
                refreshing={carregando}
                renderItem={({ item }) => (
                  <OServico data={item} navigation={navigation} />
                )}
              />
            )}
          </CtLista>
        )}
      </CtConteudo>
    </Container>
  );
}

OrdemServico.navigationOptions = {
  tabBarLabel: 'Pedir ajuda?',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={25} color={tintColor} />
  ),
};

OrdemServico.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
