"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("./recipe.entity");
const category_entity_1 = require("../categories/category.entity");
let RecipesService = class RecipesService {
    constructor(recipesRepository, categoriesRepository) {
        this.recipesRepository = recipesRepository;
        this.categoriesRepository = categoriesRepository;
    }
    async create(recipeData, userId) {
        const recipe = this.recipesRepository.create({
            title: recipeData.title,
            ingredients: recipeData.ingredients,
            instructions: recipeData.instructions,
            time: recipeData.time,
            coverImage: recipeData.coverImage,
            user: { id: userId },
        });
        const savedRecipe = await this.recipesRepository.save(recipe);
        if (recipeData.categoryIds && recipeData.categoryIds.length > 0) {
            const categories = await this.categoriesRepository.findBy({
                id: (0, typeorm_2.In)(recipeData.categoryIds),
            });
            savedRecipe.categories = categories;
            return this.recipesRepository.save(savedRecipe);
        }
        return savedRecipe;
    }
    async findAll() {
        return this.recipesRepository.find({
            relations: ['user', 'categories', 'comments'],
        });
    }
    async findOne(id) {
        const recipe = await this.recipesRepository.findOne({
            where: { id },
            relations: ['user', 'categories', 'comments', 'comments.user'],
        });
        if (!recipe) {
            throw new common_1.NotFoundException('Tarif bulunamadı!');
        }
        return recipe;
    }
    async findByUser(userId) {
        return this.recipesRepository.find({
            where: { user: { id: userId } },
            relations: ['categories'],
        });
    }
    async update(id, updateData) {
        const recipe = await this.findOne(id);
        if (updateData.title)
            recipe.title = updateData.title;
        if (updateData.ingredients)
            recipe.ingredients = updateData.ingredients;
        if (updateData.instructions)
            recipe.instructions = updateData.instructions;
        if (updateData.time)
            recipe.time = updateData.time;
        if (updateData.coverImage)
            recipe.coverImage = updateData.coverImage;
        if (updateData.categoryIds) {
            const categories = await this.categoriesRepository.findBy({
                id: (0, typeorm_2.In)(updateData.categoryIds),
            });
            recipe.categories = categories;
        }
        return this.recipesRepository.save(recipe);
    }
    async remove(id) {
        const recipe = await this.findOne(id);
        await this.recipesRepository.remove(recipe);
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(1, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map