import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 24px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.View`
  height: 22px;
  width: 65px;

  border-radius: 6px;
  background: #999591;
  margin: 0 24px 12px;
  opacity: 0.2;
`;

export const Hour = styled.View`
  padding: 12px;
  background: #3e3b47;
  border-radius: 10px;
  margin-right: 8px;

  opacity: 0.2;
`;

export const HourText = styled.Text`
  color: #3e3b47;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;
