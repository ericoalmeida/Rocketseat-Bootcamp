import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #fff;
  border-bottom-color: #d9d9d9;
  border-bottom-width: 1px;
  height: 60px;
  width: 100%;

  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const ImLogo = styled.Image`
  height: 49px;
  width: 150px;
`;

export const SbSair = styled(RectButton)`
  margin-left: 65px;
  margin-right: 5px;
  height: 35px;
  width: 35px;
  background-color: #fff;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
