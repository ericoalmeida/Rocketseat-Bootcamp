import { hash, compare } from 'bcryptjs';

import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generate(payload: string) {
    return hash(payload, 8);
  }

  public async compare(payload: string, hashed: string) {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
