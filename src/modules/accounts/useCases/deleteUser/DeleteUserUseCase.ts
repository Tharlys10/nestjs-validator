import { Inject, NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '../../repositories/IUsersRepository';

class DeleteUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    await this.usersRepository.delete(user.id);
  }
}

export { DeleteUserUseCase };
