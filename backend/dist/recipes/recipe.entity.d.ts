import { User } from '../users/user.entity';
import { Category } from '../categories/category.entity';
import { Comment } from '../comments/comment.entity';
export declare class Recipe {
    id: number;
    title: string;
    ingredients: string;
    instructions: string;
    time: string;
    coverImage: string;
    createdAt: Date;
    user: User;
    categories: Category[];
    comments: Comment[];
}
