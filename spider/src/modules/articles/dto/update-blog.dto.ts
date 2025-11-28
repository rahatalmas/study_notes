import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

//for updating existing blog data
export class UpdateBlogDto extends PartialType(CreateBlogDto) {}
