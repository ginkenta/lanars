import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';

@Entity({ name: 'portfolio' })
export class Portfolio extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @OneToMany(() => Image, (img) => img.id)
  images: Image[];
}
