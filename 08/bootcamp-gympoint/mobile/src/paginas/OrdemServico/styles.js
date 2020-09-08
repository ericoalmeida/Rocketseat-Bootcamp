import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const CtConteudo = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 0 10px;
`;

export const CtButton = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const BtCheckin = styled(Button)`
  flex: 1;
`;

export const CtTotalOs = styled.View`
  flex-direction: row;
  justify-content: space-around;

  height: 30px;

  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const CtTotalSemResposta = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const CtTotalRespondida = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const TxTotalSemResposta = styled.Text`
  margin-left: 5px;
  color: #a4a4a4;
  font-weight: bold;
`;

export const TxTotalRespondida = styled.Text`
  margin-left: 5px;
  color: #00e150;
  font-weight: bold;
`;

export const CtLista = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const FlLista = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CtListaVazia = styled.View`
  height: 180px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const TxListaVazia = styled.Text`
  margin-top: 15px;
  font-weight: bold;
  color: #a4a4a4;
  margin-bottom: 30px;
`;

export const CtBtAtualizar = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
`;

export const BtAtualizar = styled(Button)`
  flex: 1;
`;
