import { UserService } from './user.service';
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/user.input';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    @Inject('UserService')
    private readonly service: UserService,
  ) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    console.log(await this.service.findAll());
    return this.service.findAll();
  }

  @Mutation((returns) => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.service.create(createUserInput);
  }
}
