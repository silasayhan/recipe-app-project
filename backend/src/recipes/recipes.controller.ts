import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

@Controller('recipe')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Get()
  async getAllRecipes() {
    return this.recipesService.findAll();
  }

  @Get('my-recipes')
  @UseGuards(JwtAuthGuard)
  async getMyRecipes(@Request() req) {
    return this.recipesService.findByUser(req.user.id);
  }

  @Get(':id')
  async getRecipe(@Param('id') id: number) {
    return this.recipesService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage }))
  async createRecipe(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    const recipeData = {
      ...body,
      coverImage: file ? file.filename : null,
      categoryIds: body.categoryIds ? JSON.parse(body.categoryIds) : [],
    };

    return this.recipesService.create(recipeData, req.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage }))
  async updateRecipe(
    @Param('id') id: number,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateData = {
      ...body,
      categoryIds: body.categoryIds ? JSON.parse(body.categoryIds) : undefined,
    };

    if (file) {
      updateData.coverImage = file.filename;
    }

    return this.recipesService.update(id, updateData);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRecipe(@Param('id') id: number) {
    await this.recipesService.remove(id);
    return { message: 'Tarif başarıyla silindi!' };
  }
}