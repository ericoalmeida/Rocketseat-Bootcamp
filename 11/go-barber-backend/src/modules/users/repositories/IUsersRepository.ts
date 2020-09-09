import Users from '@modules/users/infra/typeorm/entities/Users';
import ICreateUsersDTO from '@users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@users/dtos/IFindAllProvidersDTO';

interface IUsersRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<Users[]>;
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  create(data: ICreateUsersDTO): Promise<Users>;
  update(user: Users): Promise<Users>;
}

export default IUsersRepository;
