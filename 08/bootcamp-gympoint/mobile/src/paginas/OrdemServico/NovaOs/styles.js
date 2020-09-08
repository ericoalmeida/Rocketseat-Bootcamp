import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

export const CtConteudo = styled.View`
  padding: 10px;
  flex: 1;
`;

export const CtSolicitacao = styled.View`
  height: 270px;
  margin-bottom: 15px;
`;

export const CtFooter = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 54px;
`;
export const SbEnviar = styled(Button)`
  flex: 1;
`;

export const TxSolicitacao = styled.TextInput`
  flex: 1;
  text-align: left;
  background-color: #fff;
  border-width: 1px;
  border-color: #d9d9d9;
  border-radius: 3px;
  font-size: 16px;
`;

export const CtTipo = styled.View`
  height: 44px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const TxDescricao = styled.Text`
  font-size: 16px;
`;

export const TxTipoAuxilio = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
