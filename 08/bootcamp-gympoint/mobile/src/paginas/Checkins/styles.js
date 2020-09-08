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

export const CtNumeroCheckIns = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  height: 30px;

  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const CtCarregandoNumeroCheckIns = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #a4a4a4;
  height: 25px;
  width: 210px;
  border-radius: 3px;
  opacity: 0.5;
`;

export const TxNumeroCheckIns = styled.Text`
  font-weight: bold;
  color: #a4a4a4;
`;

export const CtLista = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const FlLista = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CtListaVazia = styled.View`
  height: 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const TxListaVazia = styled.Text`
  margin-top: 15px;
  font-weight: bold;
  color: #a4a4a4;
`;
