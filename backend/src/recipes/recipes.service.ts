import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Category } from '../categories/category.entity';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(recipeData: any, userId: number): Promise<Recipe> {
    const recipe = this.recipesRepository.create({
      title: recipeData.title,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      time: recipeData.time,
      coverImage: recipeData.coverImage,
      user: { id: userId },
    });

    const savedRecipe = await this.recipesRepository.save(recipe);

    if (recipeData.categoryIds && recipeData.categoryIds.length > 0) {
      const categories = await this.categoriesRepository.findBy({
        id: In(recipeData.categoryIds),
      });
      savedRecipe.categories = categories;
      return this.recipesRepository.save(savedRecipe);
    }

    return savedRecipe;
  }

  async findAll(): Promise<Recipe[]> {
    return this.recipesRepository.find({
      relations: ['user', 'categories', 'comments'],
    });
  }

  async findOne(id: number): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: { id },
      relations: ['user', 'categories', 'comments', 'comments.user'],
    });

    if (!recipe) {
      throw new NotFoundException('Tarif bulunamadı!');
    }

    return recipe;
  }

  async findByUser(userId: number): Promise<Recipe[]> {
    return this.recipesRepository.find({
      where: { user: { id: userId } },
      relations: ['categories'],
    });
  }

  async update(id: number, updateData: any): Promise<Recipe> {
    const recipe = await this.findOne(id);

    if (updateData.title) recipe.title = updateData.title;
    if (updateData.ingredients) recipe.ingredients = updateData.ingredients;
    if (updateData.instructions) recipe.instructions = updateData.instructions;
    if (updateData.time) recipe.time = updateData.time;
    if (updateData.coverImage) recipe.coverImage = updateData.coverImage;

    if (updateData.categoryIds) {
      const categories = await this.categoriesRepository.findBy({
        id: In(updateData.categoryIds),
      });
      recipe.categories = categories;
    }

    return this.recipesRepository.save(recipe);
  }

  async remove(id: number): Promise<void> {
    const recipe = await this.findOne(id);
    await this.recipesRepository.remove(recipe);
  }
}