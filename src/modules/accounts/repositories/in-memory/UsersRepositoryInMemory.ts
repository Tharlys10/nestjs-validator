import { CreateUserDTO } from '../../dtos/CreateUserDTO';
import { FindAllUsersDTO } from '../../dtos/FindAllUsersDTO';
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

  async findAll({
    name,
    page = 1,
    amount = 10,
  }: FindAllUsersDTO): Promise<{ users: User[]; total: number }> {
    let users = this.users;

    if (name) {
      users = users.filter(
        (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) > -1,
      );
    }

    const total = users.length;

    users = users.splice((page - 1) * amount, amount);

    return { users, total };
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
    this.users[index].updated_at = new Date();
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);

    this.users.slice(index, 1);
  }
}

export { UsersRepositoryInMemory };
