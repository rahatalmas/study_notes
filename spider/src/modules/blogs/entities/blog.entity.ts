import { MetaDataDto } from "../../../common/meta-dat.dto"

export class Blog extends MetaDataDto{
    private title: string
    private author_id: string
    private status: string
    private summary: string 
    private content: string
    private meta_title: string 
    private meta_description: string
    
    constructor(title,author_id,status,summary,content){
        super()
        this.title = title;
        this.author_id = author_id;
        this.status = status;
        this.summary = summary;
        this.content = content;
        this.meta_title = "seo meta title";
        this.meta_description = "seo description"
    }
}
