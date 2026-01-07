import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Recipe } from '../recipes/recipe.entity';
export declare class CommentsService {
    private commentsRepository;
    private recipesRepository;
    constructor(commentsRepository: Repository<Comment>, recipesRepository: Repository<Recipe>);
    create(commentData: any, userId: number): Promise<Comment>;
    findByRecipe(recipeId: number): Promise<Comment[]>;
    remove(id: number, userId: number): Promise<void>;
}
