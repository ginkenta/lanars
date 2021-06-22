import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Portfolio } from '../../models/portfolio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private readonly portfolioRepository: Repository<Portfolio>,
  ) {}

  async findOne(search: any): Promise<Portfolio | undefined> {
    return await this.portfolioRepository.findOne({ where: search });
  }

  async findAll(userId: 'uuid'): Promise<Portfolio[] | undefined> {
    return await this.portfolioRepository
      .createQueryBuilder('p')
      .where('p.userId = :userId', { userId })
      .getMany();
  }

  async deleteOne(portfolio: Portfolio): Promise<any> {
    return await this.portfolioRepository.remove([portfolio]);
  }

  async create(input): Promise<Portfolio> {
    console.log(input, '  inputinputinputinput');
    return await this.portfolioRepository.save(input);
  }
}
