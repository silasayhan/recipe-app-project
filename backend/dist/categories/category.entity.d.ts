import { Recipe } from '../recipes/recipe.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    recipes: Recipe[];
}
