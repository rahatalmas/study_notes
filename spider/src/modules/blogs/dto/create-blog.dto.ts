import { IsString,IsNotEmpty } from "class-validator"

export class CreateBlogDto{
    @IsNotEmpty()
    @IsString()
    title: string 

    @IsNotEmpty()
    @IsString()
    author_id: string

    @IsNotEmpty()
    @IsString()
    status: string 

    @IsNotEmpty()
    @IsString()
    summary: string

    @IsNotEmpty()
    @IsString()
    content: string
}