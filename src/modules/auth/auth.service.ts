/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcrypt';
import { User } from '../../models/user.entity';
import { UserService } from '../user/user.service';
import { expiredTokens } from '../../middlewares/is.token.availible.middleware';

// export const expiredTokens = new Set();

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

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

  async addExpiredToken(token: string): Promise<boolean> {
    expiredTokens.add(token);
    return true;
  }

  async createToken(user: User): Promise<any> {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
