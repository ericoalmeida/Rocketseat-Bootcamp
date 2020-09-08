import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { requererAcesso } from '~/loja/modulos/autenticacao/acoes';

import logo from '~/arquivos/logo.png';

import { Conteudo } from './styles';

const esquemaValidacao = Yup.object().shape({
  email: Yup.string()
    .email('Informe um e-mail válido')
    .required('E-mail é um campo obrigatório'),
  senha: Yup.string()
    .min(6, 'Mínimo 6 digitos para o campo senha')
    .required('Senha é um campo obrigatório'),
});

export default function Acesso() {
  const executar = useDispatch();
  const carregando = useSelector(state => state.autenticacao.carregando);

  function enviarDadosDeAcesso({ email, senha }) {
    executar(requererAcesso(email, senha));
  }

  return (
    <>
      <Conteudo>
        <img src={logo} alt="logo" />
        <Form schema={esquemaValidacao} onSubmit={enviarDadosDeAcesso}>
          <text>SEU E-MAIL</text>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <text>SUA SENHA</text>
          <Input name="senha" type="password" placeholder="******" />

          <button type="submit">
            {carregando ? 'Carregando...' : 'Acessar'}
          </button>
          <Link to="/criarconta">Criar conta gratuita</Link>
        </Form>
      </Conteudo>
    </>
  );
}
