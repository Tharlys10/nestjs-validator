import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './infra/http/controllers/users.controller';
import { User } from './infra/typeorm/entities/User';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { CreateUserUseCase } from './useCases/createUser/CreateUserUseCase';
import { DeleteUserUseCase } from './useCases/deleteUser/DeleteUserUseCase';
import { FindUserByIdUseCase } from './useCases/findUserById/FindUserByIdUseCase';
import { UpdateUserUseCase } from './useCases/updateUser/UpdateUserUseCase';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    FindUserByIdUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: 'UsersRepository',
      inject: [UsersRepository],
      useClass: UsersRepository,
    },
  ],
})
export class AccountsModule {}
