import { PickType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveCommentDto extends PickType(CreateCommentDto,["blog_id","user_id"]) {
    @IsNotEmpty()
    @IsString()
    comment_id:string
}