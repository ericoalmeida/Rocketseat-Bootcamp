import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { atualizarPerfilRequest } from '~/store/modules/usuario/actions';
import { sairSistema } from '~/store/modules/auth/actions';
// import AvatarInput from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const perfil = useSelector(state => state.usuario.perfil);

  function handleSubmit(data) {
    dispatch(atualizarPerfilRequest(data));
  }

  function handlesairSistema() {
    dispatch(sairSistema());
  }

  return (
    <Container>
      <Form initialData={perfil} onSubmit={handleSubmit}>
        {/* <AvatarInput name="avatar_id" /> */}
        <Input name="nome" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu email" />

        <hr />

        <Input
          name="senhaAntiga"
          type="password"
          placeholder="Sua senha atual"
        />
        <Input
          name="senha"
          type="password"
          placeholder="Informe sua nova senha"
        />
        <Input
          name="confirmacaoSenha"
          type="password"
          placeholder="Confirmacao da nova senha"
        />

        <button type="submit">Atualizar Perfil</button>
      </Form>

      <button type="button" onClick={handlesairSistema}>
        Sair do goBarber
      </button>
    </Container>
  );
}
