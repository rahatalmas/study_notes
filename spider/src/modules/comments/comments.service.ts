import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.resitory';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { ResponseInterface } from '../../common/interface/response.interface';

@Injectable()
export class CommentsService {
  //commentRepo is for database queries
  constructor(private readonly commentRepo: CommentRepository){}

  async findAll(){
    let res = await this.commentRepo.allComments()
    return res
  }

  //adds a new comment to a post
  async create(createCommentDto: CreateCommentDto) {
    console.log("Service: ",createCommentDto)
    let res = await this.commentRepo.addComment(createCommentDto);
    console.log("response: ",res)
    return new ResponseInterface({message:"comment added",data:res})
  }
  
  //updates a comment
  async update(updateCommentDto: UpdateCommentDto) {
      let res = await this.commentRepo.updateComment(updateCommentDto)
      return new ResponseInterface({message:"comment updated",data:res})
  }

  //removes a comment
  async remove(removeCommentDto: RemoveCommentDto) {
    let res = await this.commentRepo.removeComment(removeCommentDto.blog_id,removeCommentDto.user_id,removeCommentDto.comment_id);
    return new ResponseInterface({message:"comment deleted",data:res})
  }
}
