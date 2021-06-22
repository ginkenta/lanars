import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:id')
  async profile(@Param() id: 'uuid'): Promise<any> {
    return await this.userService.findOneById(id);
  }

  @Get()
  async all(): Promise<any> {
    return await this.userService.find();
  }
}
