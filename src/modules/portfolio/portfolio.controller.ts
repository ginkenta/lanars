/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Portfolio } from '../../models/portfolio.entity';
import { PortfolioService } from './portfolio.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createPortfolio(
    @Req() req: Request,
    @Body() body: { name: string; description: string },
  ): Promise<Portfolio> {
    // @ts-ignore
    const { id: user } = req?.user;
    return await this.portfolioService.create({ ...body, user });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:portfolio')
  async deletePortfolio(
    @Req() req: Request,
    @Param('portfolioId') portfolio: 'uuid',
  ): Promise<any> {
    // @ts-ignore
    const { id: user } = req?.user;
    const portf = await this.portfolioService.findOne({
      user,
      portfolio,
    });
    if (!portf) throw new Error('Bad portfolio id');
    return await this.portfolioService.deleteOne(portf);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getOnePortfolio(@Param('id') id: 'uuid'): Promise<Portfolio> {
    return await this.portfolioService.findOne({ id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyPortfolios(@Req() req: Request): Promise<Portfolio> {
    // @ts-ignore
    const { id: userId } = req?.user;
    // @ts-ignore
    return await this.portfolioService.findAll(userId);
  }
}
