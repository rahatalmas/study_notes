import { IsString, IsNotEmpty, IsArray, Length, min } from "class-validator"

//default blog dto
export class CreateBlogDto{
    @IsNotEmpty()
    @IsString()
    title: string 

    @IsNotEmpty()
    @IsString()
    author_id: string

    @IsString()
    status: string 

    @IsNotEmpty()
    @IsString()
    @Length(25)
    content: string
    
    @IsArray()
    @IsString({each:true})
    tags: string[]
}