import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from '../../models/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
// import { UserController } from './auth.controller';
// import { UserService } from './auth.service';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
  exports: [],
})
export class AuthModule {}
