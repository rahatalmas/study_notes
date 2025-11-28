import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BlogsService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
@UsePipes(new ValidationPipe())
export class BlogsController {
  //blog service implements the business logics
  constructor(private readonly blogsService: BlogsService) {}

  //this controller creates a new blog
  //route: http://hostname/blogs/post
  @Post('/post')
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  //this controller returns all the blogs
  //route: http://hostname/blogs
  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  //this controller returns a blog with the id in parameter
  //route: http://hostname/blogs/123456abcdmongoid
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  //this contrller updates existing blog fields 
  //route: http://hostname/blogs/update/12345id
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  //this controller deletes a blog from the blogs collection
  //route: http://hostname/blogs/remove/12334abcd
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }
}
