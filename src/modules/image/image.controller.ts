/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { Image } from '../../models/image.entity';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createImage(
    @Req() req: Request,
    @Body() body: { name: string; description: string; link: string },
  ): Promise<Image> {
    // @ts-ignore
    const { id: user } = req?.user;
    return await this.imageService.create({ ...body, user });
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
  @Delete('/:portfolio')
  async deletePortfolio(
    @Req() req: Request,
    @Param('portfolioId') portfolio: 'uuid',
  ): Promise<any> {
    // @ts-ignore
    const { id: user } = req?.user;
    const portf = await this.imageService.findOne({
      user,
      portfolio,
    });
    if (!portf) throw new Error('Bad portfolio id');
    return await this.imageService.deleteOne(portf);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getOnePortfolio(@Param('id') id: 'uuid'): Promise<Image> {
    return await this.imageService.findOne({ id });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getMyPortfolios(@Req() req: Request): Promise<Image> {
    // @ts-ignore
    const { id: userId } = req?.user;
    // @ts-ignore
    return await this.imageService.findAll(userId);
  }
}
