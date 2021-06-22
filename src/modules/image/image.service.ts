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

  async findAll(portfolioId: 'uuid'): Promise<Image[] | undefined> {
    return await this.imageRepository
      .createQueryBuilder('p')
      .where('p.portfolioId = :portfolioId', { portfolioId })
      .getMany();
  }

  async deleteOne(Image: Image): Promise<any> {
    return await this.imageRepository.remove([Image]);
  }

  async create(input): Promise<Image> {
    return await this.imageRepository.save(input);
  }
}
