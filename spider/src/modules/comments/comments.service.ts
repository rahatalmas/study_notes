import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.resitory';
import { RemoveCommentDto } from './dto/remove-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { ResponseInterface } from '../../common/interface/response.interface';

@Injectable()
export class CommentsService {
  constructor(private readonly db: CommentRepository){}

  async create(createCommentDto: CreateCommentDto) {
    let comment = new CommentEntity(createCommentDto)
    let res = await this.db.addComment(comment);
    if(res.matchedCount==0){
       return new NotFoundException("blog not found")
    }
    return new ResponseInterface({message:"comment added",data:comment})
  }
  
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(removeCommentDto: RemoveCommentDto) {
    let res = await this.db.removeComment(removeCommentDto.blog_id,removeCommentDto.user_id,removeCommentDto.comment_id);
    return new ResponseInterface({message:"comment deleted",data:res})
  }
}
