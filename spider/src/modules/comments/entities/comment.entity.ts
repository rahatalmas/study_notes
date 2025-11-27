import { ObjectId } from "mongodb";
import { MetaDataDto } from "../../../common/meta-dat.dto";
import { CreateCommentDto } from "../dto/create-comment.dto";

export class CommentEntity extends MetaDataDto{
    blog_id:string
    user_id:string
    user_name:string
    dp_uri:string 
    comment:string
    reply_to: string

    constructor(data:CreateCommentDto){
        super()
        this._id = new ObjectId()
        this.blog_id = data.blog_id
        this.user_id = data.user_id
        this.user_name = data.user_name
        this.dp_uri = data.dp_uri? data.dp_uri : ''
        this.comment = data.comment
        this.reply_to = data.reply_to
    }
}    