import { Inject } from '@nestjs/common';
import { UserMap } from '../../mapper/UserMap';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { FindAllUsersInput, FindAllUsersOutput } from './FindAllUsersTypes';

class FindAllUsersUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, page, amount }: FindAllUsersInput): Promise<{
    users: FindAllUsersOutput[];
    total: number;
  }> {
    const { users, total } = await this.usersRepository.findAll({
      name,
      page,
      amount,
    });

    return { users: UserMap.toFindAllUsersDTO(users), total };
  }
}

export { FindAllUsersUseCase };
