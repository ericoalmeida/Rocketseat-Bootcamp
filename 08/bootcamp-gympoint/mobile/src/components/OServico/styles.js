import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #fff;
  height: 170px;
  margin: 5px 0;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

export const OsButton = styled(RectButton)`
  height: 168px;
  width: 338px;
  margin: 0;
  border-radius: 4px;
  background-color: #fff;
  border-width: 0;
`;

export const CtHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  height: 40px;
  padding: 15px;
`;

export const CtStatus = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const TxStatus = styled.Text`
  color: ${props => (props.resolvido ? '#00e150' : '#a4a4a4')};
  font-weight: bold;
  margin-left: 5px;
`;

export const CtDataHora = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const TxDataHora = styled.Text`
  color: #777777;
`;

export const CtConteudo = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 15px;
`;

export const TxConteudo = styled.Text.attrs({
  numberOfLines: 3,
})`
  color: #858585;
  text-align: justify;
  line-height: 25px;
`;
