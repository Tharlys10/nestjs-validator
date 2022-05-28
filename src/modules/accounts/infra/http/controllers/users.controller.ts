import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateUserUseCase } from 'src/modules/accounts/useCases/updateUser/UpdateUserUseCase';
import { CreateUserOutput } from '../../../useCases/createUser/CreateUserTypes';
import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { CreateUserValidator } from '../../validators/CreateUserValidator';
import { UpdateUserValidator } from '../../validators/UpdateUserValidator';

@Controller('users')
@ApiTags('Users')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class UsersController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({ description: 'Created new user' })
  @ApiBadRequestResponse({ description: 'User already exists' })
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

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @ApiNoContentResponse({ description: 'Updated user' })
  @ApiNotFoundResponse({ description: 'User not exists' })
  @ApiBadRequestResponse({
    description: 'E-mail in using | Account not active',
  })
  public async update(
    @Param('id') id: string,
    @Body() { name, email }: UpdateUserValidator,
    @Res() response: Response,
  ): Promise<Response> {
    await this.updateUserUseCase.execute({
      id,
      name,
      email,
    });

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
