import { Injectable,Inject, HttpException, InternalServerErrorException } from "@nestjs/common";
import { Db, ObjectId } from "mongodb";
import { Blog } from "./entities/blog.entity";
import { CommentEntity } from "../comments/entities/comment.entity";
import { CreateCommentDto } from "../comments/dto/create-comment.dto";
import { blogProject } from "./utils/blog.aggregate.util";
import { UpdateBlogDto } from "./dto/update-blog.dto";
import { MongoIdValidator } from "../../common/utils/mongo.util";

@Injectable()
export class BlogRepository{
    private readonly collection="blogs";
    constructor(@Inject("MONGO_DB") private readonly db:Db){}
    
    async save(blog: Blog){
       try{
          let res = await this.db.collection(this.collection).insertOne(blog)
          return res
       }catch(err){
          throw new InternalServerErrorException("Failed To save Blog")
       }
    }

    // async saveWithAuthorSubset(){

    // }
    
    async findAll(): Promise<Blog[]>{
        let blogs = await this.db.collection(this.collection).find().toArray() as Blog[]
        return blogs;
    }

    async findAllWithAuthor() {
            const blogs = await this.db.collection(this.collection).aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author_id",
                    foreignField: "_id",
                    as: "author"
                },
            },
            {
                $unwind: {
                    path: "$author",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project:blogProject
            }
            ]).toArray();

            return blogs;
    }

    async findByIdWithAuthor(id: string){
        let bId = MongoIdValidator(id)
        let res = this.db.collection(this.collection).aggregate(
            [
                {
                    $match:{_id:bId}
                },
                {
                    $lookup:{
                        from:"users",
                        localField:"author_id",
                        foreignField:"_id",
                        as:"author"
                    },
                },
                {
                    $unwind:{
                        path: "$author",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project:blogProject
                }
            ]
        ).toArray()
        return res
    }

    async removeBlog(id: string){
        let bId = MongoIdValidator(id)
        let res = await this.db.collection(this.collection).deleteOne({_id: bId})
        return res
    }
    
    async findById(id: string){
        let bId = MongoIdValidator(id)
        let res = await this.db.collection(this.collection).findOne({
            _id:bId
        })
        return res
    }

    async updateBlog(id:string,data: UpdateBlogDto){
       let bId = MongoIdValidator(id)
       let res = await this.db.collection(this.collection).updateOne(
            {
                _id:bId
            },
            {
                $set: {...data},

            }
        )
        return res;
    }
}