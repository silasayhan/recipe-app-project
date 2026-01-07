import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Comment } from '../comments/comment.entity';

@Entity('recipes')
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  ingredients: string;

  @Column('text')
  instructions: string;

  @Column({ nullable: true })
  time: string;

  @Column({ nullable: true })
  coverImage: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.recipes)
  user: User;

  @ManyToMany(() => Category, category => category.recipes)
  @JoinTable({
    name: 'recipe_categories',
    joinColumn: { name: 'recipe_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  @OneToMany(() => Comment, comment => comment.recipe)
  comments: Comment[];
}