interface IHashProvider {
  generate(payload: string): Promise<string>;
  compare(payload: string, hashed: string): Promise<Boolean>;
}

export default IHashProvider;
