import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import autenticacaoConfig from '../../config/autenticacao';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ erro: 'Token não encontrado.' });
  }

  const [, token] = authorization.split(' ');

  try {
    const tokenDecifrado = await promisify(jwt.verify)(
      token,
      autenticacaoConfig.segredo
    );

    req.usuario_id = tokenDecifrado.id;

    return next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token informádo é inválido.' });
  }
};
