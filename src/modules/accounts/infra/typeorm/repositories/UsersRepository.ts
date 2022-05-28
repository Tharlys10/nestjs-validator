import { CreateUserDTO } from 'src/modules/accounts/dtos/CreateUserDTO';
import { IUsersRepository } from 'src/modules/accounts/repositories/IUsersRepository';
import { EntityManager, EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor(manager: EntityManager) {
    this.repository = manager.getRepository(User);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ where: { email } });
  }

  async create({
    name,
    email,
    password,
    code_active,
  }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password, code_active });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
