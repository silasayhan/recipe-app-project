import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private categoriesService;
    constructor(categoriesService: CategoriesService);
    getAllCategories(): Promise<import("./category.entity").Category[]>;
    getCategory(id: number): Promise<import("./category.entity").Category>;
    createCategory(body: {
        name: string;
        description?: string;
    }): Promise<import("./category.entity").Category>;
    updateCategory(id: number, body: {
        name?: string;
        description?: string;
    }): Promise<import("./category.entity").Category>;
    deleteCategory(id: number): Promise<{
        message: string;
    }>;
}
