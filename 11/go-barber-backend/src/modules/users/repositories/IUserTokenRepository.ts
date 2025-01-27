import UserToken from '@users/infra/typeorm/entities/UserToken';

interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}

export default IUserTokenRepository;
