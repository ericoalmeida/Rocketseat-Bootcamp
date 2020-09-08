import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const ImAvatar = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  background: #eee;
`;

export const TxNome = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const TxBio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #999;
  margin-top: 5px;
  text-align: center;
`;

export const FlFavoritos = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 2px;
  padding: 2px;
`;

export const Starred = styled.View`
  background: #f9f9f9;
  border-radius: 3px;
  margin-top: 5px;
  padding: 10px 15px;
  margin-bottom: 2px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #777;
  margin-top: 2px;
`;
