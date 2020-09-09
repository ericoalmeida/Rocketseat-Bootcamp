import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
  text-align: left;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const BackButton = styled(RectButton)`
  padding: 12px 24px;
  margin-right: 7px;
`;

export const UserAvatar = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 70px;
  align-self: center;
`;
