import styled from 'styled-components';

export const ContainerBotoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 100px;
  width: 100%;
  margin-top: 20px;

  button {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5px;
    border: 0;
    background: #ee4d64;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;

    span {
      color: #fff;
    }

    &:hover {
      font-size: 16px;
      background: #ae3949;
    }
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

export const ContainerInicio = styled.div`
  flex: 1;
  background: #fff;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  padding: 10px;
`;
