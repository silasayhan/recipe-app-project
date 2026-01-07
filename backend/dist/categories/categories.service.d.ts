import { Repository } from 'typeorm';
import { Category } from './category.entity';
export declare class CategoriesService {
    private categoriesRepository;
    constructor(categoriesRepository: Repository<Category>);
    create(categoryData: Partial<Category>): Promise<Category>;
    findAll(): Promise<Category[]>;
    findOne(id: number): Promise<Category>;
    update(id: number, updateData: Partial<Category>): Promise<Category>;
    remove(id: number): Promise<void>;
}
