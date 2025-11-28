import { IsNotEmpty,IsOptional,IsString } from "class-validator";

//default dto for comments
export class CreateCommentDto{
    @IsNotEmpty()
    @IsString()
    blog_id: string

    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    @IsString()
    user_name: string

    @IsOptional()
    @IsString()
    dp_uri?:string

    @IsString()
    comment:string
    
    @IsString()
    reply_to: string
}
