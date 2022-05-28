import { Inject, NotFoundException } from '@nestjs/common';
import { UserMap } from '../../mapper/UserMap';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { FindUserByIdOutput } from './FindUserByIdTypes';

class FindUserByIdUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<FindUserByIdOutput> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    return UserMap.toFindUserByIdDTO(user);
  }
}

export { FindUserByIdUseCase };
