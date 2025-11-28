import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';

@Controller('comments')
export class CommentsController {
  //constructor: commentService for business logic
  constructor(private readonly commentsService: CommentsService) {}

  @Get('')
  findAll(){
    return this.commentsService.findAll()
  }

  //for adding a new comment to a blog
  @Post('add')
  create(@Body() createCommentDto: CreateCommentDto) {
    console.log("controller ",createCommentDto)
    return this.commentsService.create(createCommentDto);
  }

  //for editing a comment
  @Patch('edit')
  update(@Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(updateCommentDto);
  }

  //for removing a comment
  @Delete('remove')
  remove(@Body() removeCommentDto: RemoveCommentDto) {
    return this.commentsService.remove(removeCommentDto);
  }
}
