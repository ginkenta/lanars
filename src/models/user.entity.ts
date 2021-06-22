import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Portfolio } from './portfolio.entity';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  login: string;

  @Column({ type: 'varchar' })
  password?: string;

  @OneToMany(() => Portfolio, (portfolio) => portfolio.user, { cascade: true })
  portfolios: Portfolio[];
}
