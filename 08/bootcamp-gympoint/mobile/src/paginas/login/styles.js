import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Formuilario = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FrInput = styled(Input)`
  margin-bottom: 5px;
`;

export const SbButton = styled(Button)`
  margin-top: 5px;
`;

export const ImLogo = styled.Image`
  height: 86px;
  width: 140px;
`;
