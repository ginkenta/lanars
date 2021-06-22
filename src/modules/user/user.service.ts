import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOneById(id: 'uuid'): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findOneByLogin(login: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { login } });
  }

  async find(): Promise<User[] | []> {
    return await this.userRepository.find();
  }
}
