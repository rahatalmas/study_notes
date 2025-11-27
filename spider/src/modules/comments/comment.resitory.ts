import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Db} from "mongodb";
import { CommentEntity } from "./entities/comment.entity";
import { MongoIdValidator } from "../../common/utils/mongo.util";

@Injectable()
export class CommentRepository{
    collection = "blogs"
    constructor(@Inject("MONGO_DB") private readonly db:Db){}
    
    async addComment(comment: CommentEntity){
        let blogId = MongoIdValidator(comment.blog_id)

        let res = await this.db.collection(this.collection).updateOne(
            {_id: blogId},
            {$push:{
                comments:{
                   ...comment
                }as any
            }}
        )
        return res;
    }
    
    async removeComment(b_id: string, u_id: string, c_id: string) {
        console.log("remove comment repo")
        const blogId = MongoIdValidator(b_id);
        const commentId = MongoIdValidator(c_id);
        const userId = MongoIdValidator(u_id);
        
        const blog = await this.db.collection(this.collection).findOne(
            {
                _id: blogId,
                "comments._id": commentId
            },
            {
                projection: {
                    comments: { $elemMatch: { _id: commentId } }
                }
            }
        );
        console.log(blog)
        if (!blog || !blog.comments?.length) {
            throw new NotFoundException("comment not found");
        }

        const comment = blog.comments[0];
        console.log(comment)
        if (comment.user_id.toString() !== userId.toString()) {
            throw new UnauthorizedException("cannot delete others comments");
        }

        let res = await this.db.collection(this.collection).updateOne(
            { _id: blogId },
            { $pull: { comments: { _id: commentId } } as any }
        );

        return res;
    }

    async updateComment(b_id,c_id){

    }
}