import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

//Quando nao precisar acrescentar nenhum props nova, usa-se um type
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
);

export default Button;
