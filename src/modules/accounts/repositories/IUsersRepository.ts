import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: CreateUserDTO): Promise<User>;
}

export { IUsersRepository };
