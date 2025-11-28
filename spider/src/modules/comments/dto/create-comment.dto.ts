import { IsNotEmpty,IsOptional,IsString } from "class-validator";
import { MetaDataDto } from "../../../common/meta-dat.dto";

//default dto for comments
export class CreateCommentDto{
    @IsNotEmpty()
    @IsString()
    blog_id: string

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    comment:string
    
    @IsOptional()
    @IsString()
    reply_to?: string
}
