import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateAdminInput } from './dto/create-admin.input'
import { Admin } from './entities/admin.entity'

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) {}

  create(createAdminInput: CreateAdminInput): Promise<Admin> {
    const newAdmin = this.adminRepository.create(createAdminInput)
    return this.adminRepository.save(newAdmin)
  }

  findOne(id?: number, username?: string): Promise<Admin> {
    return this.adminRepository.findOne({
      where: [
        {
          id,
        },
        { username },
      ],
    })
  }
}
