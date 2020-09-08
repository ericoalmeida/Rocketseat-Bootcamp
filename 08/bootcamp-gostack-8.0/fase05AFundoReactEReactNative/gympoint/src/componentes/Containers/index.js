import styled from 'styled-components';

export const CtPrincipal = styled.div`
  background: #fff;
  max-width: 900px;
  margin: 50px auto;
  padding: 10px;
  border-left: 2px solid #d9d9d9;
`;

export const CtCabecalho = styled.div``;

export const CtNumeroRegistrosPagina = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CtBusca = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    margin-right: 5px;
  }
`;

export const CtAcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  height: 50px;
  margin-bottom: 3px;
`;

export const CtConsulta = styled.div`
  background: #eff3f8;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const CtConteudo = styled.div`
  background: #fff;
  height: 100%;
`;

export const CtPaginacao = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  div {
    display: flex;
    border: 1px solid #659fc6;
    background: #6faed9;
    color: #fff;
    height: 28px;
    width: 28px;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`;

export const CtTitulo = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;

  span {
    font-weight: bold;
    font-size: 25px;
  }
`;

export const CtNenhumRegistro = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 35px;
`;

export const CtContadorRegistros = styled.div``;

export const CtRodape = styled.div`
  background: #eff3f8;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 5px;
`;

export const CtPrincipalJanela = styled.div`
  max-width: 700px;
  margin: 50px auto;

  form {
    display: flex;
    flex-direction: column;

    input,
    select {
      margin-bottom: 5px;
      color: #000;
      height: 44px;
      border: 1px solid #cbcbcb;
      background: #fff;
      padding: 5px;
      border-radius: 3px;
      margin-bottom: 5px;
      width: 100%;

      &:focus {
        border: 1px solid #cbcbcb;
        background: #fffddc;
        color: #000;
      }

      &:disabled {
        border: 1px solid #cbcbcb;
        background: #f5f5f5;
        color: #000;
      }
    }
  }
`;

export const CtCabecalhoJanela = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  height: 75px;

  button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 5px;
  }
`;

export const CtConteudoJanela = styled.div`
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-radius: 3px;

  #label,
  label {
    color: #3f3f3f;
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  span {
    margin-top: 5px;
    color: #ff0000;
  }
`;

export const CtCamposSuperiores = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: #fff;
  margin-bottom: 5px;

  div {
    display: flex;
    flex-direction: column;

    > input {
      background: #eee;
      border: 1px solid #c1cad6;
      color: #000;
      &:focus {
        border: 1px solid #c1cad6;
        background: #eee;
        color: #000;
      }
    }
  }
`;

export const CtCamposInferiores = styled.div`
  display: flex;
  flex-direction: colum;
  justify-content: space-between;
  height: 125px;
  width: 100%;
  padding-top: 15px;
  background: #fff;
`;

export const CtInternoCampos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 3px;
`;

export const CtBotoesJanela = styled.div`
  display: flex;
  flex-direction: row;
`;

export const CtTituloJanela = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  > strong {
    color: #3f3f3f;
    font-size: 25px;
  }

  > span {
    color: #888;
    font-size: 19px;
  }
`;
