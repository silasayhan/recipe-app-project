import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Recipe } from '../recipes/recipe.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
  ) {}

  async create(commentData: any, userId: number): Promise<Comment> {
    const recipe = await this.recipesRepository.findOne({
      where: { id: commentData.recipeId },
    });

    if (!recipe) {
      throw new NotFoundException('Tarif bulunamadı!');
    }

    const comment = this.commentsRepository.create({
      content: commentData.content,
      rating: commentData.rating,
      user: { id: userId },
      recipe: { id: commentData.recipeId },
    });

    return this.commentsRepository.save(comment);
  }

  async findByRecipe(recipeId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { recipe: { id: recipeId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: number, userId: number): Promise<void> {
    const comment = await this.commentsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Yorum bulunamadı!');
    }

    if (comment.user.id !== userId) {
      throw new NotFoundException('Bu yorumu silme yetkiniz yok!');
    }

    await this.commentsRepository.remove(comment);
  }
}