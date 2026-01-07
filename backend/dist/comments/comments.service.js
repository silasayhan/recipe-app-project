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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./comment.entity");
const recipe_entity_1 = require("../recipes/recipe.entity");
let CommentsService = class CommentsService {
    constructor(commentsRepository, recipesRepository) {
        this.commentsRepository = commentsRepository;
        this.recipesRepository = recipesRepository;
    }
    async create(commentData, userId) {
        const recipe = await this.recipesRepository.findOne({
            where: { id: commentData.recipeId },
        });
        if (!recipe) {
            throw new common_1.NotFoundException('Tarif bulunamadı!');
        }
        const comment = this.commentsRepository.create({
            content: commentData.content,
            rating: commentData.rating,
            user: { id: userId },
            recipe: { id: commentData.recipeId },
        });
        return this.commentsRepository.save(comment);
    }
    async findByRecipe(recipeId) {
        return this.commentsRepository.find({
            where: { recipe: { id: recipeId } },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async remove(id, userId) {
        const comment = await this.commentsRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!comment) {
            throw new common_1.NotFoundException('Yorum bulunamadı!');
        }
        if (comment.user.id !== userId) {
            throw new common_1.NotFoundException('Bu yorumu silme yetkiniz yok!');
        }
        await this.commentsRepository.remove(comment);
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map