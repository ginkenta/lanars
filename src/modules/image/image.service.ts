import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from '../../models/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findOne(search: any): Promise<Image | undefined> {
    return await this.imageRepository.findOne({ where: search });
  }

  async findAll({ limit, offset }): Promise<Image[] | undefined> {
    return await this.imageRepository.find({
      skip: offset,
      take: limit,
      order: { createDateTime: 'DESC' },
    });
  }

  async deleteOne(Image: Image): Promise<any> {
    return await this.imageRepository.remove([Image]);
  }

  async create(input): Promise<Image> {
    return await this.imageRepository.save(input);
  }
}
