import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { cadastreseRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  nome: Yup.string().required('Nome e obrigatório'),
  email: Yup.string()
    .email('Informe um email válido')
    .required('Email é obrigatorio'),
  senha: Yup.string()
    .min(6, 'Senha mínima de 6 caracteres')
    .required('Senha é obrigatoria'),
});

export default function CadastreSe() {
  const dispatch = useDispatch();

  function handleSubmit({ nome, email, senha }) {
    dispatch(cadastreseRequest(nome, email, senha));
  }

  return (
    <>
      <img src={logo} alt="logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="nome" type="text" placeholder="Seu nome" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="senha" type="password" placeholder="Sua senha" />

        <button type="submit">Criar Conta</button>
        <Link to="/">Ja possuo uma conta</Link>
      </Form>
    </>
  );
}
