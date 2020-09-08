import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  max-width: 900px;
  margin: 50px auto;
  padding: 10px;
`;

export const Cabecalho = styled.div``;

export const ContainerAcoes = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  height: 50px;
  margin-bottom: 3px;

  div {
    height: 44px;
    width: 125px;
    border: 0;
    border-radius: 3px;
    background: #ee4d64;
  }
`;

export const ContainerConsulta = styled.div`
  background: #eff3f8;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const Conteudo = styled.div`
  background: #fff;
  height: 100%;
`;

export const ContainerTabela = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 35px;
  background: #fff;
`;

export const ContainerTabelaCabecalho = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background: #fff;
`;
export const ContainerTabelaCorpo = styled.div`
  flex: 1;
  background: #fff;
  border-top: 1px solid #ddd;
`;

export const Rodape = styled.div`
  background: #eff3f8;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 5px;
`;
