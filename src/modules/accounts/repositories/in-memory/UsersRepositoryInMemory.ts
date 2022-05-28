import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../../dtos/UpdateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[];

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async create({
    name,
    email,
    password,
    code_active,
  }: CreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      code_active,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async update({ id, name, email }: UpdateUserDTO): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    this.users[index].name = name;
    this.users[index].email = email;
  }
}

export { UsersRepositoryInMemory };
