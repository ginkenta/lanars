/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    // @ts-ignore
    return req.user;
  }
}
