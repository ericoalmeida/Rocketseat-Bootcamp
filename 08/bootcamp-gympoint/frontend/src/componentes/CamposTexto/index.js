import styled from 'styled-components';

export const InCampoFiltro = styled.input`
  height: 28px;
  width: 175px;
  margin: 10px;
  text-align: left;
  padding: 5px;
  align-items: center;
  border: 1px solid #d9d9d9;
  background: #f9f9f9;

  &:focus {
    border: 1px solid #d9d9d9;
    background: #fffddc;
  }

  ::placeholder {
    color: #777;
  }
`;
