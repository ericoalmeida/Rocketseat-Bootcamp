import React from 'react';
import { Switch } from 'react-router-dom';

import Rota from './rota';

import Acesso from '~/paginas/Acesso';
import Perfil from '~/paginas/Perfil';
import CriarConta from '~/paginas/CriarConta';
import Inicio from '~/paginas/Inicio';
import Alunos from '~/paginas/Alunos';
import CadAlunos from '~/paginas/Alunos/Cadastro';
import Matricula from '~/paginas/Matricula';
import CadMatriculas from '~/paginas/Matricula/Cadastro';
import Planos from '~/paginas/Planos';
import CadPlanos from '~/paginas/Planos/Cadastro';
import OrdemServico from '~/paginas/OrdemServico';
import TipoOrdemServico from '~/paginas/TipoOrdemServico';
import CadTipoOrdemServico from '~/paginas/TipoOrdemServico/Cadastro';

export default function Routes() {
  return (
    <Switch>
      <Rota path="/" exact component={Acesso} />
      <Rota path="/criarconta" component={CriarConta} />
      <Rota path="/perfil" component={Perfil} rotaRestrita />
      <Rota path="/inicio" component={Inicio} rotaRestrita />
      <Rota path="/alunos" component={Alunos} rotaRestrita />
      <Rota path="/cadalunos" component={CadAlunos} rotaRestrita />
      <Rota path="/matricula" component={Matricula} rotaRestrita />
      <Rota path="/cadmatricula" component={CadMatriculas} rotaRestrita />
      <Rota path="/planos" component={Planos} rotaRestrita />
      <Rota path="/cadplanos" component={CadPlanos} rotaRestrita />
      <Rota path="/ordemservico" component={OrdemServico} rotaRestrita />
      <Rota
        path="/tipoordemservico"
        component={TipoOrdemServico}
        rotaRestrita
      />
      <Rota
        path="/cadtipoordemservico"
        component={CadTipoOrdemServico}
        rotaRestrita
      />
    </Switch>
  );
}
