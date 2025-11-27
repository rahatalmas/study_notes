import { ObjectId } from "mongodb"
import { MetaDataDto } from "../../../common/meta-dat.dto"
import { CreateBlogDto } from "../dto/create-blog.dto"

export class Blog extends MetaDataDto{
    title: string
    author_id: ObjectId
    status: string
    content: string
    summary: string 
    meta_title: string 
    meta_description: string
    tags: string[]
    likes: string[]
    comments: string[]
    
    constructor(data: CreateBlogDto){
        super()
        this.title = data.title;
        this.author_id = new ObjectId(data.author_id);
        this.status = data.status
        this.content = data.content;
        this.summary = this.content?.slice(0, 25) || "";
        this.tags = data.tags
        this.meta_title = "seo meta title";
        this.meta_description = "seo description";
        this.likes=[]
        this.comments=[]
    }
}
