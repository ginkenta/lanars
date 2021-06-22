/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Controller,
  Get,
  Param,
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
    // @ts-ignore
    return req.user;
  }

  @Post('signup')
  async signup(@Body() body: UserSignupInterface) {
    const password = await this.authService.createPassword(body.password);
    return await this.userService.createNewUser({ ...body, password });
  }
}
