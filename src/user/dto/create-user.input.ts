import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { userType } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  fullName: string;

  @Field()
  password: string;

  @Field()
  userType: userType;
}
