import React from 'react';
import { useSelector } from 'react-redux';
import { StatusBar } from 'react-native';

import criarRotas from '~/rotas';

export default function App() {
  const alunoLogado = useSelector(state => state.autenticacao.alunoLogado);

  const Rotas = criarRotas(alunoLogado);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Rotas />
    </>
  );
}
