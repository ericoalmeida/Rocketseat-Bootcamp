import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { Container, Formuilario, FrInput, SbButton, ImLogo } from './styles';
import logo from '~/arquivos/logo.png';

import { requererAcesso } from '~/loja/modulos/autenticacao/acoes';

export default function Login() {
  const executar = useDispatch();
  const [alunoId, setAlunoId] = useState('');

  const carregando = useSelector(state => state.autenticacao.carregando);

  function efetuarAcessoAoSistema() {
    if (alunoId === '') {
      Alert.alert('Aviso', 'Informe um ID válido!');
      return;
    }

    if (!Number(alunoId)) {
      Alert.alert('Aviso', 'Informe um ID válido!');
      return;
    }

    executar(requererAcesso(alunoId));
  }

  return (
    <Container>
      <ImLogo source={logo} />

      <Formuilario>
        <FrInput
          icon="person-add"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={efetuarAcessoAoSistema}
          value={alunoId}
          onChangeText={setAlunoId}
        />
        <SbButton onPress={efetuarAcessoAoSistema} loading={carregando}>
          Entrar no Sistema
        </SbButton>
      </Formuilario>
    </Container>
  );
}
