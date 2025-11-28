import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Db} from "mongodb";
import { MongoIdValidator } from "../../common/utils/mongo.util";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Injectable()
export class CommentRepository{
    commentCollection = "comments"
    blogCollection = "blogs"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}

    async allComments(){
        let comments = await this.db.collection(this.commentCollection).find().toArray()
        return comments
    }

    //logic and query for adding comments
    async addComment(comment: CreateCommentDto){
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            const res = await this.db.collection(this.commentCollection).insertOne(comment,{session})
            console.log(res)
            const res2 = await this.db.collection(this.blogCollection).updateOne(
                {
                    _id: MongoIdValidator(comment.blog_id)
                },
                {
                    $inc:{commentsCount:1}
                },
                {
                    upsert:true,
                    session
                }
            )
            await session.commitTransaction()
            return res
        }catch(err){
            await session.abortTransaction()
            console.log(err)
            throw err
        }finally{
            await session.endSession()
        }
    }
    
    //logics and query for removing comments
    async removeComment(blogId: string,userId: string,commentId: string) {
        const session = this.db.client.startSession()
        session.startTransaction()
        try{
            const res = await this.db.collection(this.commentCollection).deleteOne(
                {
                    $and:[
                       { _id: MongoIdValidator(commentId)},{user_id:userId}
                    ]
                },   
            )
            if(res.deletedCount>0){
                const res2 = await this.db.collection(this.blogCollection).updateOne(
                    {_id: MongoIdValidator(blogId)},
                    {$inc:{commentsCount:-1}}
                )
            }else{
                throw new NotFoundException("no comment found with the id")
            }
            await session.commitTransaction()
        }catch(err){
            await session.abortTransaction()
            throw err
        }finally{
            await session.endSession()
        }
    }

    async updateComment(updateCommentDto: UpdateCommentDto){
        let res = await this.db.collection(this.commentCollection).updateOne(
            {
                $and:[
                    {_id:MongoIdValidator(updateCommentDto.comment_id)},
                    {user_id:updateCommentDto.user_id}
                ]
            },
            {
                $set: {comment:updateCommentDto.comment}  
            }
        )
        return res
    }
}