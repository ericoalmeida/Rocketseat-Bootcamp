import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import LeiouteAcesso from '~/paginas/_leioutes/acesso';
import LeioutePadrao from '~/paginas/_leioutes/padrao';

import { loja } from '~/loja';

export default function Rota({
  component: Componente,
  rotaRestrita,
  ...propriedadesRestantes
}) {
  const { usuarioLogado } = loja.getState().autenticacao;

  if (!usuarioLogado && rotaRestrita) {
    return <Redirect to="/" />;
  }

  if (usuarioLogado && !rotaRestrita) {
    return <Redirect to="/inicio" />;
  }

  const Leioute = usuarioLogado ? LeioutePadrao : LeiouteAcesso;

  return (
    <Route
      {...propriedadesRestantes}
      render={propriedades => (
        <Leioute>
          <Componente {...propriedades} />
        </Leioute>
      )}
    />
  );
}

Rota.propTypes = {
  rotaRestrita: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

Rota.defaultProps = {
  rotaRestrita: false,
};
