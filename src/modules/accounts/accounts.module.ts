import { Module } from '@nestjs/common';
import { UsersController } from './infra/http/controllers/users.controller';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
  ],
})
export class AccountsModule {}
