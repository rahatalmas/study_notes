import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

//dto for updating comments
//used in update() controller
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
