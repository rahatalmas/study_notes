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
    
    //this method implements query for saving a blog to the collection
    //used in create() method in service
    async save(blog: Blog){
       //need to implement logics to check user exists with the id or not..
       let res = await this.db.collection(this.collection).insertOne(blog)
       return res
    }

    async saveWithAuthorSubset(){
       console.log("for testing, maybe implement later if necessary...")
    }
    
    //this method implements query for returning list of blogs
    async findAll() {
        return "all blogs"
    }
     
    //this method implements query for returning list of blogs with author information
    //used in findAll() method in service
    async findAllWithRefs() {
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
                $addFields: {
                    blog_id_str: { $toString: "$_id" }
                }
            },
            {
                $lookup: {
                    from:"comments",
                    localField:"blog_id_str",
                    foreignField:"blog_id",
                    as: "comments"
                }
            },
            {
                $project:blogProject
            }
            ]).toArray();

            return blogs;
    }
    //this method implements query for returning specific blogs with author information
    //used in findOne() method in service
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

    //this method implements query for removing a blog
    //used in remove() method in service
    async removeBlog(id: string){
        let bId = MongoIdValidator(id)
        let res = await this.db.collection(this.collection).deleteOne({_id: bId})
        return res
    }
    
    //this method implements query for returning a specific blog
    async findById(id: string){
        let bId = MongoIdValidator(id)
        let res = await this.db.collection(this.collection).findOne({
            _id:bId
        })
        return res
    }

    //this method implements query for updating a blog
    //used in update() method in service
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