import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  create(createUserInput: CreateUserInput) {
    const newUser = this.userRepository.create(createUserInput)
    return this.userRepository.save(newUser)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['restaurants', 'reviews', 'restaurants.reviews', 'reviews.restaurant'],
    })
  }

  async findOne(id?: number, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        {
          id,
        },
        { email },
      ],
      relations: ['restaurants', 'reviews', 'restaurants.reviews', 'reviews.restaurant'],
    })
    if (!user) throw new NotFoundException(`No user with id ${id} found`)
    return user
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, updateUserInput)
    return await this.userRepository.findOne(id)
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }
}
