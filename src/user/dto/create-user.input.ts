import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsAlpha()
  username: string;

  @Field()
  name: string;

  @Field()
  password: string;
}
