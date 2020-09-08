import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { loginRquest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Informe um email válido')
    .required('Email é obrigatório'),
  senha: Yup.string()
    .min(6, 'Senha mínima de 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function Login() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, senha }) {
    dispatch(loginRquest(email, senha));
  }

  return (
    <>
      <img src={logo} alt="logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="senha" type="password" placeholder="Sua senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/cadastrese">Criar conta gratuita</Link>
      </Form>
    </>
  );
}
