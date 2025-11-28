import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { RemoveCommentDto } from './dto/remove-comment.dto';

@Controller('comments')
export class CommentsController {
  //constructor: commentService for business logic
  constructor(private readonly commentsService: CommentsService) {}

  //for adding a new comment to a blog
  //route: http://hostname/comments/add
  @Post('add')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  //for editing a comment
  //route: http://hostname/comments/edit/12345abcmongoid
  @Patch('edit/:id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  //for removing a comment
  //route: http://hostname/comments/remove
  @Delete('remove')
  remove(@Body() removeCommentDto: RemoveCommentDto) {
    return this.commentsService.remove(removeCommentDto);
  }
}
