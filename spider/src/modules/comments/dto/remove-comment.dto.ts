import { PickType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';

//remove comment dto
//used in remove() controller
export class RemoveCommentDto extends PickType(CreateCommentDto,["blog_id","user_id"]) {
    @IsNotEmpty()
    @IsString()
    comment_id:string
}