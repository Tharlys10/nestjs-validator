import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
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
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { FindUserByIdUseCase } from 'src/modules/accounts/useCases/findUserById/FindUserByIdUseCase';
import { DeleteUserUseCase } from 'src/modules/accounts/useCases/deleteUser/DeleteUserUseCase';
import { FindUserByIdOutput } from 'src/modules/accounts/useCases/findUserById/FindUserByIdTypes';
import { UpdateUserUseCase } from 'src/modules/accounts/useCases/updateUser/UpdateUserUseCase';
import { CreateUserOutput } from '../../../useCases/createUser/CreateUserTypes';
import { CreateUserUseCase } from '../../../useCases/createUser/CreateUserUseCase';
import { CreateUserValidator } from '../../validators/CreateUserValidator';
import { UpdateUserValidator } from '../../validators/UpdateUserValidator';
import { FindAllUsersOutput } from 'src/modules/accounts/useCases/findAllUsers/FindAllUsersTypes';
import { FindAllUsersUseCase } from 'src/modules/accounts/useCases/findAllUsers/FindAllUsersUseCase';
import { PlayersValidationParamsPagination } from 'src/shared/infra/pipes/playersValidationParamsPagination.pipe';

@Controller('users')
@ApiTags('Users')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
export class UsersController {
  constructor(
    private findUserByIdUseCase: FindUserByIdUseCase,
    private findAllUsersUseCase: FindAllUsersUseCase,
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get('/:id')
  @ApiOkResponse({ description: 'Find user by id' })
  @ApiNotFoundResponse({ description: 'User not exists' })
  public async findById(@Param('id') id: string): Promise<FindUserByIdOutput> {
    const user = await this.findUserByIdUseCase.execute(id);

    return user;
  }

  @Get('/')
  @ApiOkResponse({ description: 'Find all users' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'page', required: true })
  @ApiQuery({ name: 'amount', required: true })
  public async findAll(
    @Query('name') name: string,
    @Query('page', PlayersValidationParamsPagination) page: number,
    @Query('amount', PlayersValidationParamsPagination) amount: number,
  ): Promise<{
    users: FindAllUsersOutput[];
    total: number;
  }> {
    const users = await this.findAllUsersUseCase.execute({
      name,
      page,
      amount,
    });

    return users;
  }

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

  @Delete('/:id')
  @ApiNoContentResponse({ description: 'Deleted user' })
  @ApiNotFoundResponse({ description: 'User not exists' })
  public async delete(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<Response> {
    await this.deleteUserUseCase.execute(id);

    return response.status(HttpStatus.NO_CONTENT).send();
  }
}
