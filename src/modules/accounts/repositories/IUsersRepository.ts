import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
