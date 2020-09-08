import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AutenticacaoConfig from '../../config/autenticacao';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ erro: 'Token nao encontrado!' });
  }

  const [, token] = authorization.split(' ');

  try {
    const tokenDecifrado = await promisify(jwt.verify)(
      token,
      AutenticacaoConfig.codigo
    );

    req.usuario_id = tokenDecifrado.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido.' });
  }
};
