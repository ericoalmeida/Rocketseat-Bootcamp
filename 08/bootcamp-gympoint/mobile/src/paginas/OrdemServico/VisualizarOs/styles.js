import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f5f5f5;
`;

export const CtConteudo = styled.View`
  padding: 10px;
  flex: 1;
`;

export const CtOrdemServico = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: auto;
  width: 340px;
  background-color: #fff;
  border-width: 1px;
  border-radius: 3px;
  border-color: #d9d9d9;
`;

export const CtAlinhamento = styled.View`
  height: 250;
  width: 335px;
`;

export const CtTituloSolicitacao = styled.View`
  height: 45px;
  width: 335px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TxTituloSolicitacao = styled.Text`
  font-size: 14.5px;
  font-weight: bold;
  color: #333;
`;

export const TxSolicitacaoData = styled.Text`
  color: #a4a4a4;
`;

export const CtSolicitacao = styled.View`
  padding: 10px;
  height: 95px;
  width: 335px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TxSolicitacao = styled.Text`
  color: #a4a4a4;
  line-height: 25px;
  text-align: justify;
`;

export const CtTituloResposta = styled.View`
  height: 45px;
  width: 335px;
  background-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const TxTituloResposta = styled.Text`
  font-size: 14.5px;
  font-weight: bold;
  color: #333;
`;

export const TxRespostaData = styled.Text`
  height: auto;
  color: #a4a4a4;
`;

export const CtResposta = styled.View`
  height: 145px;
  width: 335px;
  background-color: #fff;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 5px 10px;
`;

export const TxResposta = styled.Text`
  line-height: 25px;
  color: #a4a4a4;
  text-align: justify;
`;
