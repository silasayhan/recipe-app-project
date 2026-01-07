import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private recipesService;
    constructor(recipesService: RecipesService);
    getAllRecipes(): Promise<import("./recipe.entity").Recipe[]>;
    getMyRecipes(req: any): Promise<import("./recipe.entity").Recipe[]>;
    getRecipe(id: number): Promise<import("./recipe.entity").Recipe>;
    createRecipe(body: any, file: Express.Multer.File, req: any): Promise<import("./recipe.entity").Recipe>;
    updateRecipe(id: number, body: any, file: Express.Multer.File): Promise<import("./recipe.entity").Recipe>;
    deleteRecipe(id: number): Promise<{
        message: string;
    }>;
}
