import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { PickType } from '@nestjs/swagger';

//dto for updating comments
//used in update() controller
export class UpdateCommentDto extends PickType(CreateCommentDto,["user_id","comment"]) {
    @IsNotEmpty()
    @IsString()
    comment_id:string
}
