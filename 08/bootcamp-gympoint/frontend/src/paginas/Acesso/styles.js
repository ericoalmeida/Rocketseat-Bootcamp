import styled from 'styled-components';

export const Conteudo = styled.div`
  background: #fff;
  height: 478px;
  border-radius: 3px;
  width: 100%;
  max-width: 360px;
  text-align: center;
  box-shadow: 1px 2px 3px rgba(93.3, 30.2, 39.2, 0.5);

  img {
    margin-top: 30px;
    height: 97px;
    width: 158px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    text-align: left;
    padding: 30px;

    button {
      margin: 5px 0 0;
      height: 44px;
      border: 0;
      background: #ee4d64;
      font-weight: bold;
      color: #fff;
      border-radius: 3px;
    }

    text {
      color: #464646;
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 13px;
    }

    input {
      background: #fff;
      border-radius: 3px;
      border: 1px solid #dfdfdf;
      height: 44px;
      margin: 0 0 10px;
      padding: 0 15px;

      &::placeholder {
        color: #969696;
      }
    }

    a {
      text-align: center;
      margin-top: 10px;
      color: #58716f;
    }
  }
`;
