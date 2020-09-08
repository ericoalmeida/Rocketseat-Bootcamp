import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  background: #fff;
  height: 60px;
  border: 1px solid #dfdfdf;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 10px;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04);
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-right: 1px solid #dfdfdf;
  padding-right: 15px;

  img {
    height: 28px;
    width: 55px;
    margin-right: 10px;
  }

  strong {
    color: #ee4d64;
    font-weight: bold;
    font-size: 16px;
  }
`;

export const Conteudo = styled.div`
  nav {
    flex: 1;

    a {
      margin: 10px;
      color: #9b9b9b;
      font-weight: bold;
      font-size: 14px;

      &:hover {
        color: ${darken(0.09, '#9b9b9b')};
      }
    }
  }
`;

export const Perfil = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #dfdfdf;
  padding-left: 15px;
  align-items: flex-end;

  a {
    margin: 0, 0, 3px;
    color: #333;
  }

  strong {
    font-size: 16px;
    color: #333;
    align-self: flex-start;
    margin: 0 0 5px;
  }

  button {
    border: 0;
    background: none;
    color: #ee4d64;
    font-size: 14px;
  }
`;
