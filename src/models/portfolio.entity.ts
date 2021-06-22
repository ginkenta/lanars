import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity({ name: 'portfolio' })
export class Portfolio extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @ManyToOne(() => User, (user) => user.id)
  user: 'uuid';

  @OneToMany(() => Image, (img) => img.id, { cascade: true })
  images: Image[];
}
