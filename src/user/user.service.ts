import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

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
    return this.userRepository.find({ relations: ['restaurants', 'reviews'] })
  }

  async findOne(id?: number, email?: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        {
          id,
        },
        { email },
      ],
      relations: ['restaurants', 'reviews'],
    })
    if (!user) throw new NotFoundException(`No user with id ${id} found`)
    return user
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    await this.userRepository.update(id, updateUserInput)
    const updatedUser = await this.userRepository.findOne(id)
    return updatedUser
  }

  async remove(id: number): Promise<string> {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      return 'User not available'
    }
    if (await this.userRepository.delete(id)) {
      return 'User deleted successfully'
    }
    return 'User not deleted'
  }
}
