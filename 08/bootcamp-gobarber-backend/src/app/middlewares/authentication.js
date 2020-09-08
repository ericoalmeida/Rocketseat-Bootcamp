import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authenticationSettings from '../../settings/authentication';

export default async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ error: 'token not provided' });
  }

  try {
    const [, token] = authorizationHeader.split(' ');
    const { secret } = authenticationSettings;

    const decoded = await promisify(jwt.verify)(token, secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'token inválid' });
  }
};
