import { CommentsService } from './comments.service';
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    getRecipeComments(recipeId: number): Promise<import("./comment.entity").Comment[]>;
    createComment(body: {
        recipeId: number;
        content: string;
        rating: number;
    }, req: any): Promise<import("./comment.entity").Comment>;
    deleteComment(id: number, req: any): Promise<{
        message: string;
    }>;
}
