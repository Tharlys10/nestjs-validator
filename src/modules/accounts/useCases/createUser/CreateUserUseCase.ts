import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { UserMap } from '../../mapper/UserMap';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { CreateUserInput, CreateUserOutput } from './CreateUserTypes';

@Injectable()
class CreateUserUseCase {
  constructor(
    @Inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUserInput): Promise<CreateUserOutput> {
    const user_already_exists = await this.usersRepository.findByEmail(email);

    if (user_already_exists) {
      throw new BadRequestException('User already exists');
    }

    const code_active = this.randomCodeActiveAccount();

    const password_hash = await this.encryptPassword(password);

    const user = await this.usersRepository.create({
      name: name.toUpperCase(),
      email,
      password: password_hash,
      code_active,
    });

    return UserMap.toCreateUserDTO(user);
  }

  /**
   * random code for active account user
   */
  private randomCodeActiveAccount(): string {
    let code_active = '';

    for (let index = 0; index < 6; index++) {
      code_active += Math.floor(Math.random() * 9).toString();
    }

    return code_active;
  }

  /**
   *
   * @param password
   * encrypt password to user
   */
  private async encryptPassword(password: string): Promise<string> {
    const password_hash = await hash(password, 8);

    return password_hash;
  }
}

export { CreateUserUseCase };
