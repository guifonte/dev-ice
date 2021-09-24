import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 128 })
  name: string;
}
