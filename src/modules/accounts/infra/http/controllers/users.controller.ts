import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserOutput } from '../../../useCases/createUser/CreateUserTypes';
import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { CreateUserValidator } from '../../validators/CreateUserValidator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Create a new user' })
  @ApiBadRequestResponse({ description: 'User already exists' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  public async create(
    @Body() { name, email, password }: CreateUserValidator,
  ): Promise<CreateUserOutput> {
    const user = await this.createUserUseCase.execute({
      name,
      email,
      password,
    });

    return user;
  }
}
