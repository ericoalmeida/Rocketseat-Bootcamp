import React from 'react';

import { Container } from './styles';

interface TooptipProps {
  title: string;
  className?: string;
}

const Tooltip: React.FC<TooptipProps> = ({ title, className, children }) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
