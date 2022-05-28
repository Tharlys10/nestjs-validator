import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/modules/accounts/dtos/CreateUserDTO';
import { UpdateUserDTO } from 'src/modules/accounts/dtos/UpdateUserDTO';
import { IUsersRepository } from 'src/modules/accounts/repositories/IUsersRepository';
import { Repository } from 'typeorm';
import { User } from '../entities/User';

class UsersRepository implements IUsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

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

  async update({ id, name, email }: UpdateUserDTO): Promise<void> {
    await this.repository.update(id, {
      name,
      email,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { UsersRepository };
