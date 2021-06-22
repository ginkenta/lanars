/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
// import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(login: string, pass: string): Promise<User | null> {
    const user: User = await this.userService.findOneByLogin(login);
    // check pass with bcrypt
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...otherInfo } = user;
      // @ts-ignore
      return otherInfo;
    }
    return null;
  }
}
