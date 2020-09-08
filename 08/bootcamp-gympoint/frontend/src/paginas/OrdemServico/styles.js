import styled from 'styled-components';
import { rgba } from 'polished';

export const Container = styled.div`
  background: #fff;
  height: 450px;
  width: 400px;
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const CtConteudoOs = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const CtPerguntaTituloOs = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  #labelOs {
    color: #333;
    font-weight: bold;
    font-size: 14px;
    margin-right: 5px;
  }

  strong {
    color: #555;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const CtPerguntaOs = styled.div`
  p {
    color: #777;
    font-size: 14px;
  }
`;

export const CtResponstaTituloOs = styled.div`
  margin-bottom: 5px;

  #labelOs {
    color: #333;
    font-weight: bold;
    font-size: 14px;
    margin-right: 5px;
  }
`;

export const CtRespostaOs = styled.div`
  width: 100%;
  height: 210px;

  span {
    margin-top: 10px;
    color: #ff0000;
  }

  textarea {
    width: 100%;
    padding: 5px;
    height: 100%;
    text-align: left;
    align-items: center;
    border: 1px solid #d9d9d9;
    background: #fff;

    &:focus {
      border: 1px solid #d9d9d9;
      background: #fffddc;
    }

    &:disabled {
      border: 1px solid #d9d9d9;
      background: #f9f9f9;
    }

    ::placeholder {
      color: #777;
    }
  }
`;

export const CtBotoesOs = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  button {
    border: 1px solid #c34052;
    background: #ee4d64;
    border-radius: 3px;
    height: 44px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
  }

  #SbVoltar {
    margin: 5px;
    width: 100%;
    height: 44px;
    border: 1px solid #659fc6;
    background: #6faed9;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    padding: 5px;
  }
`;

export const modalStyles = {
  overlay: {
    backgroundColor: rgba(0, 0, 0, 0.6),
  },

  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
