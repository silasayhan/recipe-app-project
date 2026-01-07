import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { Category } from '../categories/category.entity';
export declare class RecipesService {
    private recipesRepository;
    private categoriesRepository;
    constructor(recipesRepository: Repository<Recipe>, categoriesRepository: Repository<Category>);
    create(recipeData: any, userId: number): Promise<Recipe>;
    findAll(): Promise<Recipe[]>;
    findOne(id: number): Promise<Recipe>;
    findByUser(userId: number): Promise<Recipe[]>;
    update(id: number, updateData: any): Promise<Recipe>;
    remove(id: number): Promise<void>;
}
