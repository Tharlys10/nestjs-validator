import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infra/http/controllers/users.controller';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';
import { UpdateUserUseCase } from './useCases/updateUser/UpdateUserUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
  ],
})
export class AccountsModule {}
