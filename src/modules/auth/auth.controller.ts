/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Controller,
  Post,
  UseGuards,
  Req,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserSignupInterface } from 'src/interfaces/user/signup';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    //@ts-ignore
    return this.authService.createToken(req?.user);
  }

  @Post('signup')
  async signup(@Body() body: UserSignupInterface) {
    const password = await this.authService.createPassword(body.password);
    const user = await this.userService.createNewUser({ ...body, password });
    return this.authService.createToken(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request): Promise<boolean> {
    const token = req?.headers?.['authorization']?.split(' ')?.[1];
    return await this.authService.addExpiredToken(token);
  }
}
