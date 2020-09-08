import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdDoneAll, MdKeyboardArrowLeft } from 'react-icons/md';
import * as Yup from 'yup';

import historico from '~/servicos/historico';
import { atualizarPerfil } from '~/loja/modulos/usuario/acoes';

import {
  CtPrincipalJanela,
  CtCabecalhoJanela,
  CtConteudoJanela,
  CtCamposSuperiores,
  CtCamposInferiores,
  CtInternoCampos,
  CtBotoesJanela,
  CtTituloJanela,
} from '~/componentes/Containers';

import { SBVoltar, SBSalvar } from '~/componentes/Botoes';

const esquemaValidacao = Yup.object().shape({
  nome: Yup.string(),
  email: Yup.string().email(),
  senhaAntiga: Yup.string(),
  senha: Yup.string().when('senhaAntiga', (senhaAntiga, campo) =>
    senhaAntiga ? campo.required('Senha é um campo obrigatório.') : campo
  ),
  confirmacaoSenha: Yup.string().when('senha', (senha, campo) =>
    senha
      ? campo
          .required('Confirmacao Nova Senha e um campo obrigatório')
          .oneOf(
            [Yup.ref('senha')],
            'Nova senha e confirmação da nova senha nao sao iguais'
          )
      : campo
  ),
});

export default function Perfil() {
  const executar = useDispatch();
  const perfil = useSelector(state => state.usuario.perfil);

  function voltarPaginaInicial() {
    historico.push('/inicio');
  }

  function enviarDadosAtualizarPerfil(data) {
    executar(atualizarPerfil(data));
  }

  return (
    <CtPrincipalJanela>
      <Form
        initialData={perfil}
        onSubmit={enviarDadosAtualizarPerfil}
        schema={esquemaValidacao}
      >
        <CtCabecalhoJanela>
          <CtTituloJanela>
            <span>Perfil de Usuário</span>
          </CtTituloJanela>
          <CtBotoesJanela>
            <SBVoltar type="button" onClick={voltarPaginaInicial}>
              <MdKeyboardArrowLeft size={20} color="#fff" />
              VOLTAR
            </SBVoltar>
            <SBSalvar type="submit">
              <MdDoneAll size={20} color="#fff" />
              SALVAR
            </SBSalvar>
          </CtBotoesJanela>
        </CtCabecalhoJanela>

        <CtConteudoJanela>
          <CtCamposSuperiores>
            <Input
              name="nome"
              placeholder="Nome Completo"
              label="NOME COMPLETO"
            />

            <Input
              name="email"
              type="email"
              placeholder="exemplo@email.com.br"
              label="ENDEREÇO DE E-MAIL"
            />
          </CtCamposSuperiores>

          <CtCamposInferiores>
            <CtInternoCampos>
              <Input
                name="senhaAntiga"
                type="password"
                placeholder="******"
                label="SENHA ANTIGA"
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="senha"
                type="password"
                placeholder="******"
                label="NOVA SENHA"
              />
            </CtInternoCampos>

            <CtInternoCampos>
              <Input
                name="confirmacaoSenha"
                type="password"
                placeholder="******"
                label="CONFIRME NOVA SENHA"
              />
            </CtInternoCampos>
          </CtCamposInferiores>
        </CtConteudoJanela>
      </Form>
    </CtPrincipalJanela>
  );
}
