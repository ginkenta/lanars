/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Image } from '../../models/image.entity';
import { PortfolioService } from '../portfolio/portfolio.service';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(
    private readonly imageService: ImageService,
    private readonly portfolioService: PortfolioService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createImage(
    @Req() req: Request,
    @Body()
    body: {
      name: string;
      description: string;
      link: string;
      portfolio: 'uuid';
    },
  ): Promise<Image> {
    // @ts-ignore
    const { id: user } = req?.user;
    const existPortfolio = await this.portfolioService.findOne({
      user,
      id: body.portfolio,
    });
    if (!existPortfolio) throw new BadRequestException();
    return await this.imageService.create({ ...body, comments: [] });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    // should be a link on AWS S3
    const payload = {
      filename: image?.filename,
    };
    return payload;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deletePortfolio(
    @Req() req: Request,
    @Param('id') id: 'uuid',
  ): Promise<any> {
    // @ts-ignore
    const { id: user } = req?.user;
    const image = await this.imageService.findOne({
      id,
    });
    if (!image) throw new Error('Bad image id');
    const portf = await this.portfolioService.findOne({
      user,
      id: image.portfolio,
    });
    if (!portf) throw new BadRequestException();

    return await this.imageService.deleteOne(image);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getOnePortfolio(@Param('id') id: 'uuid'): Promise<Image> {
    return await this.imageService.findOne({ id });
  }

  @Get()
  async getImages(
    @Query('limit') limit = 0,
    @Query('offset') offset = 0,
  ): Promise<Image> {
    // @ts-ignore
    return await this.imageService.findAll({ limit, offset });
  }
}
