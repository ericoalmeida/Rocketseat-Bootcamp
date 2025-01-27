import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

const toastTypeVariations = {
  info: css`
    background: #2e77d0;
    color: #fff;
  `,

  success: css`
    background: #1db954;
    color: #fff;
  `,

  error: css`
    background: #ff1000;
    color: #fff;
  `,
};

interface ContainerProps {
  type: 'info' | 'success' | 'error';
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;

  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type]}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
  }

  strong {
    font-weight: 500;
  }

  p {
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.9;
    line-height: 20px;
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }
`;
