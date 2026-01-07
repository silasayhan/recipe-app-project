import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('recipe/:recipeId')
  async getRecipeComments(@Param('recipeId') recipeId: number) {
    return this.commentsService.findByRecipe(recipeId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Body() body: { recipeId: number; content: string; rating: number },
    @Request() req,
  ) {
    return this.commentsService.create(body, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Param('id') id: number, @Request() req) {
    await this.commentsService.remove(id, req.user.id);
    return { message: 'Yorum başarıyla silindi!' };
  }
}