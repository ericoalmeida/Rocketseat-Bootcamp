import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { criarConta } from '~/loja/modulos/autenticacao/acoes';

import logo from '~/arquivos/logo.png';

import { Conteudo } from './styles';

const esquemaValidacao = Yup.object().shape({
  nome: Yup.string().required('Nome é um campo obrigatório'),
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('E-mail é um campo obrigatório'),
  senha: Yup.string()
    .min(6, 'Mínimo 6 caracteres para a senha')
    .required('Senha é um campo obrigatório'),
});

export default function CriarConta() {
  const executar = useDispatch();

  function enviarDadosCriarConta({ nome, email, senha }) {
    executar(criarConta(nome, email, senha));
  }

  return (
    <>
      <Conteudo>
        <img src={logo} alt="logo" />
        <Form schema={esquemaValidacao} onSubmit={enviarDadosCriarConta}>
          <text>SEU NOME</text>
          <Input name="nome" type="text" placeholder="nome" />

          <text>SEU E-MAIL</text>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <text>SUA SENHA</text>
          <Input name="senha" type="password" placeholder="******" />

          <button type="submit">Criar conta</button>
          <Link to="/">Já possuo uma conta</Link>
        </Form>
      </Conteudo>
    </>
  );
}
