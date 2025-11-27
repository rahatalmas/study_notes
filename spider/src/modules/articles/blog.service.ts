import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { BlogRepository } from './blog.repository';
import { ResponseInterface } from '../../common/interface/response.interface';

@Injectable()
export class BlogsService {

  constructor(private readonly blogRepo:BlogRepository){}

  async create(createBlogDto: CreateBlogDto) {
    let blog = new Blog(createBlogDto)
    let res = await this.blogRepo.save(blog)
    return new ResponseInterface({message:"blog posted",data: res})
  }

  async findAll() {
    let blogs = await this.blogRepo.findAllWithAuthor()
    if(blogs.length>0){
       return new ResponseInterface({message:"all blogs",data:blogs})
    }else{
      return new ResponseInterface({message:`no blogs found`,data:blogs})
    }
  }

  async findOne(id: string) {
    let blog =  await this.blogRepo.findByIdWithAuthor(id)
    if(blog.length>0){
      return new ResponseInterface({message:`blog with id: ${id}`,data:blog})
    }else{
      throw new NotFoundException(`blog not found with id: ${id}`)
    }
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    let res = await this.blogRepo.updateBlog(id,updateBlogDto)
    if(res.matchedCount==0){
      throw new NotFoundException(`blog not found with id: ${id}`)
    }
    return new ResponseInterface({message:`updated blog with id: ${id}`,data:res})
  }

  async remove(id: string) {
      let res = await this.blogRepo.removeBlog(id)
      if(res.deletedCount==0){
        throw new NotFoundException(`blog not found with id: ${id}`)
      }
      return res
  }
}
