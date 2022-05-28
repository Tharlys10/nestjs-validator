import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { FindAllUsersDTO } from '../dtos/FindAllUsersDTO';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(data: FindAllUsersDTO): Promise<{ users: User[]; total: number }>;
  create(data: CreateUserDTO): Promise<User>;
  update(data: UpdateUserDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
