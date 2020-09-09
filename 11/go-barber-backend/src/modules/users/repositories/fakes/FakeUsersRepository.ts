import { uuid } from 'uuidv4';

import IUsersRepository from '@users/repositories/IUsersRepository';
import ICreateUsersDTO from '@users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@users/dtos/IFindAllProvidersDTO';
import Users from '@users/infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private users: Users[] = [];

  public async findById(id: string): Promise<Users | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<Users[]> {
    const { exceptUser_id } = data;

    let { users } = this;

    if (exceptUser_id) {
      users = this.users.filter(user => user.id !== exceptUser_id);
    }

    return users;
  }

  public async create(data: ICreateUsersDTO): Promise<Users> {
    const user = new Users();

    user.id = uuid();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.created_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);

    return user;
  }

  public async update(user: Users): Promise<Users> {
    const findIndex = this.users.findIndex(
      currentUser => currentUser.id === user.id,
    );

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
