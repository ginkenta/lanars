import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async findOne(@Param() id: 'uuid'): Promise<any> {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('')
  async profile(@Req() req): Promise<any> {
    const { id } = req.user;
    try {
      const { password, ...user } = await this.userService.findOneById(id);
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteMyProfile(@Req() req): Promise<boolean> {
    const { id } = req.user;
    try {
      await this.userService.delete(id);
      return true;
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
