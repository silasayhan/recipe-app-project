import { Recipe } from '../recipes/recipe.entity';
import { Comment } from '../comments/comment.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    recipes: Recipe[];
    comments: Comment[];
}
