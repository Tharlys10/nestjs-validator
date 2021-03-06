import { instanceToInstance } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';
import { CreateUserOutput } from '../useCases/createUser/CreateUserTypes';
import { FindAllUsersOutput } from '../useCases/findAllUsers/FindAllUsersTypes';
import { FindUserByIdOutput } from '../useCases/findUserById/FindUserByIdTypes';

class UserMap {
  static toFindUserByIdDTO({
    id,
    name,
    email,
    account_active,
    created_at,
    updated_at,
  }: User): FindUserByIdOutput {
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

  static toFindAllUsersDTO(users: User[]): FindAllUsersOutput[] {
    return users.map((user) =>
      instanceToInstance({
        id: user.id,
        name: user.name,
        email: user.email,
        account_active: user.account_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
      }),
    );
  }

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
