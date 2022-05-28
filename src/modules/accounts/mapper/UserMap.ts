import { instanceToInstance } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import { CreateUserOutput } from '../useCases/createUser/CreateUserTypes';

class UserMap {
  static toCreateUserDTO({
    id,
    name,
    email,
    account_active,
    created_at,
    updated_at,
  }: User): CreateUserOutput {
    const user = instanceToInstance({
      id,
      name,
      email,
      account_active,
      created_at,
      updated_at,
    });

    return user;
  }
}

export { UserMap };
