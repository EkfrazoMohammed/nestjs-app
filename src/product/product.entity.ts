import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;
}
