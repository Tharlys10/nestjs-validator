import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { UpdateUserInput } from './UpdateUserTypes';

@Injectable()
class UpdateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, name, email }: UpdateUserInput): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not exists');
    }

    if (!user.account_active) {
      throw new BadRequestException('Account not active');
    }

    const user_email_not_using = await this.usersRepository.findByEmail(email);

    if (user_email_not_using && user_email_not_using.id !== user.id) {
      throw new BadRequestException('E-mail in using');
    }

    await this.usersRepository.update({ id, name, email });
  }
}

export { UpdateUserUseCase };
