import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@users/repositories/IUsersRepository';
import ICreateUsersDTO from '@users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@users/dtos/IFindAllProvidersDTO';
import Users from '@users/infra/typeorm/entities/Users';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<Users>;

  constructor() {
    this.ormRepository = getRepository(Users);
  }

  public async findById(id: string): Promise<Users | undefined> {
    const findUser = await this.ormRepository.findOne(id);

    return findUser;
  }

  public async findByEmail(email: string): Promise<Users | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return findUser;
  }

  public async findAllProviders(data: IFindAllProvidersDTO): Promise<Users[]> {
    const { exceptUser_id } = data;
    let users: Users[];

    if (exceptUser_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(exceptUser_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async create(data: ICreateUsersDTO): Promise<Users> {
    const { name, email, password } = data;

    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async update(user: Users): Promise<Users> {
    return await this.ormRepository.save(user);
  }
}

export default UsersRepository;
