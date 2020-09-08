import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

export const Formulario = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const TiUsuario = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 3px;
  padding: 0 15px;
  border: 1px solid #e5e5e5;
`;

export const SbSalvarUsuario = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 3px;
  margin-left: 10px;
  padding: 0 12px;
  height: 40px;
`;

export const FlUsuarios = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 15px;
`;

export const VwUsuario = styled.View`
  align-items: center;
  margin: 0 15px 25px;
`;

export const ImAvatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
`;

export const TxNome = styled.Text`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 5px;
  text-align: center;
`;

export const TxBio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: #888;
  margin-top: 5px;
  text-align: center;
`;

export const SbPerfilUsuario = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 3px;
  background: #7159c1;
  justify-content: center;
  align-items: center;
  height: 36px;
  opacity: ${props => (props.carregando ? 0.7 : 1)};
`;

export const TxPerfilUsuario = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;
