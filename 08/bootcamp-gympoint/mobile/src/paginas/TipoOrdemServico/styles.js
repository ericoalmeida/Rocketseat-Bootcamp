import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const CtConteudo = styled.View`
  flex: 1;
  background-color: #f5f5f5;
  padding: 0 10px;
`;

export const CtTitulo = styled.View`
  height: 44px;
  background-color: #f5f5f5;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-color: #d9d9d9;
`;

export const TxTitulo = styled.Text`
  font-size: 17px;
  color: #a4a4a4;
  margin-left: 10px;
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
