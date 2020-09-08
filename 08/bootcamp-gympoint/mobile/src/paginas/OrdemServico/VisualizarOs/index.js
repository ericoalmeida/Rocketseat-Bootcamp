import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import {
  Container,
  CtConteudo,
  CtOrdemServico,
  CtTituloSolicitacao,
  TxTituloSolicitacao,
  TxSolicitacaoData,
  CtTituloResposta,
  TxTituloResposta,
  TxRespostaData,
  CtSolicitacao,
  TxSolicitacao,
  CtResposta,
  TxResposta,
  CtAlinhamento,
} from './styles';
import HeaderOs from '~/components/HeaderOs';

export default function VisualizarOs({ navigation }) {
  const ordemServico = navigation.getParam('ordem');

  return (
    <Container>
      <HeaderOs />
      <CtConteudo>
        <CtOrdemServico>
          <CtAlinhamento>
            <CtTituloSolicitacao>
              <TxTituloSolicitacao>PERGUNTA</TxTituloSolicitacao>
              <TxSolicitacaoData>
                {formatRelative(parseISO(ordemServico.created_at), new Date(), {
                  locale: pt,
                })}
              </TxSolicitacaoData>
            </CtTituloSolicitacao>
            <CtSolicitacao>
              <TxSolicitacao>{ordemServico.solicitacao}</TxSolicitacao>
            </CtSolicitacao>
          </CtAlinhamento>

          {ordemServico.data_retorno && (
            <CtAlinhamento>
              <CtTituloResposta>
                <TxTituloResposta>RESPOSTA</TxTituloResposta>
                <TxRespostaData>
                  {formatRelative(
                    parseISO(ordemServico.data_retorno),
                    new Date(),
                    {
                      locale: pt,
                    }
                  )}
                </TxRespostaData>
              </CtTituloResposta>
              <CtResposta>
                <TxResposta>{ordemServico.retorno}</TxResposta>
              </CtResposta>
            </CtAlinhamento>
          )}
        </CtOrdemServico>
      </CtConteudo>
    </Container>
  );
}

VisualizarOs.navigationOptions = ({ navigation }) => ({
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

VisualizarOs.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
