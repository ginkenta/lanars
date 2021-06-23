import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckTokenIfAvailibleMiddleware } from '../middlewares/is.token.availible.middleware';
import { configService } from '../config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { PortfolioController } from './portfolio/portfolio.controller';
import { ImageModule } from './image/image.module';
import { ImageController } from './image/image.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UserModule,
    AuthModule,
    PortfolioModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckTokenIfAvailibleMiddleware)
      .forRoutes(UserController, PortfolioController, ImageController);
  }
}
