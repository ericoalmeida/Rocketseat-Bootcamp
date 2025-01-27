import styled, { keyframes, css } from 'styled-components';

export const Formulario = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

export const RepoEdit = styled.input.attrs({
  type: 'text',
})`
  flex: 1;
  background-color: #7159c1;
  border: 1.5px solid #53418d;
  color: #fff;
  padding: 10px 15px;
  border-radius: 3px;
  font-size: 16px;
`;

const rotate = keyframes`
 from: {
   transform: rotate(0deg);
 }

 to: {
  transform: rotate(360deg);
 }
`;

export const SaveButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  height: 40px;
  border: 1.5px solid #53418d;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus {
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
