import { MetaDataDto } from "../../../common/meta-dat.dto"
import { CreateBlogDto } from "../dto/create-blog.dto"

export class Blog extends MetaDataDto{
    private title: string
    private author_id: string
    private status: string
    private summary: string 
    private content: string
    private meta_title: string 
    private meta_description: string
    
    constructor(data: CreateBlogDto){
        super()
        this.title = data.title;
        this.author_id = data.author_id;
        this.status = data.status;
        this.summary = data.summary;
        this.content = data.content;
        this.meta_title = "seo meta title";
        this.meta_description = "seo description";
    }
}
