import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  Container,
  OsButton,
  CtHeader,
  CtStatus,
  TxStatus,
  CtDataHora,
  TxDataHora,
  CtConteudo,
  TxConteudo,
} from './styles';

export default function OServico({ data, navigation }) {
  function visualizarOrdemServico(ordem) {
    navigation.navigate('VisualizarOs', { ordem });
  }

  return (
    <Container>
      <OsButton onPress={() => visualizarOrdemServico(data)}>
        <CtHeader>
          <CtStatus>
            {data.resolvido ? (
              <>
                <Icon name="check-circle" size={20} color="#00e150" />
                <TxStatus resolvido={data.resolvido}>Respondido</TxStatus>
              </>
            ) : (
              <>
                <Icon name="check-circle" size={20} color="#979797" />
                <TxStatus resolvido={data.resolvido}>Sem Resposta</TxStatus>
              </>
            )}
          </CtStatus>
          <CtDataHora>
            <TxDataHora>
              {formatRelative(parseISO(data.created_at), new Date(), {
                locale: pt,
              })}
            </TxDataHora>
          </CtDataHora>
        </CtHeader>

        <CtConteudo>
          <TxConteudo>{data.solicitacao}</TxConteudo>
        </CtConteudo>
      </OsButton>
    </Container>
  );
}

OServico.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  navigation: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
};
