import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  max-width: 900px;
  margin: 0 auto;
  margin-top: 50px;
  padding: 10px;
`;

export const CtTitulo = styled.div`
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ddd;

  span {
    font-weight: bold;
    font-size: 25px;
  }
`;

export const CtAcoes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  height: 60px;
  margin-bottom: 3px;
  padding: 5px;
  border-bottom: 1px solid #ddd;

  button {
    flex: 1;
    height: 38px;
    margin: 3px;
    border: none;
    background: #ee4d64;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`;
