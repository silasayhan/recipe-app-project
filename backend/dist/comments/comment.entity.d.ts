import { User } from '../users/user.entity';
import { Recipe } from '../recipes/recipe.entity';
export declare class Comment {
    id: number;
    content: string;
    rating: number;
    createdAt: Date;
    user: User;
    recipe: Recipe;
}
