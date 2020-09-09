import IHashProvider from '@users/providers/HashProvider/models/IHashProvider';

class FakeHashProvider implements IHashProvider {
  public async generate(payload: string) {
    return payload;
  }

  public async compare(payload: string, hashed: string) {
    return payload === hashed;
  }
}

export default FakeHashProvider;
