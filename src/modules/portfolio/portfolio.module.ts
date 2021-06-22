import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '../../models/portfolio.entity';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio])],
  providers: [PortfolioService],
  controllers: [PortfolioController],
  exports: [PortfolioService],
})
export class PortfolioModule {}
