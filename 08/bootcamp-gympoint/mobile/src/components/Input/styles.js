import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 15px;
  height: 46px;
  border: 1px solid #c1cad6;
  background-color: #fff;

  flex-direction: row;
  align-items: center;
`;

export const TiInput = styled.TextInput.attrs({
  placeholderTextColor: '#c1cad6',
})`
  flex: 1;
  color: #333;
  margin-left: 10px;
  font-size: 15px;
`;
