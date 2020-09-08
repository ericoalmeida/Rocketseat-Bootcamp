import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  border-radius: 4px;
  background-color: #fff;
  border-width: 1px;
  border-color: #d9d9d9;
  margin: 5px 0;
`;

export const TipoOsButton = styled(RectButton)`
  height: 50px;
  width: 338px;
  border-radius: 4px;
  background-color: #fff;
  border-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 10px;
`;

export const TxTipoOsButton = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #222;
  margin-left: 10px;
`;

export const CtIcone = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
