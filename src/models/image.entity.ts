import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Portfolio } from './portfolio.entity';

@Entity({ name: 'image' })
export class Image extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'varchar', length: 300 })
  link: string;

  @ManyToOne(() => Portfolio, (portfolio) => portfolio.id, { cascade: true })
  portfolio: 'uuid';

  @Column('varchar', { array: true })
  comments: string[];
}
