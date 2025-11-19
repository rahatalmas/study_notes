import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  create(createBlogDto: CreateBlogDto) {
    let data = new Blog(
      createBlogDto.title,
      createBlogDto.author_id,
      createBlogDto.status,
      createBlogDto.summary,
      createBlogDto.content
    )
   return data
  }

  findAll() {
    return `This action returns all blogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    console.log(updateBlogDto)
    return "hello world"
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }
}
