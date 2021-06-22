/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '../../models/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createPassword(pass: string): Promise<string> {
    const salt = await genSalt(8);
    const encPass = await hash(pass, salt);
    return encPass;
  }

  async validatePass(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }

  async validateUser(login: string, pass: string): Promise<User | null> {
    const user: User = await this.userService.findOneByLogin(login);

    const passIsMatch = await this.validatePass(pass, user?.password || '');
    if (user && passIsMatch) {
      const { password, ...otherInfo } = user;
      return otherInfo;
    }
    return null;
  }
}
