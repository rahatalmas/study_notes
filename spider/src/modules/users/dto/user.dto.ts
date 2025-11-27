import { PartialType } from '@nestjs/swagger';
import {IsArray,IsString} from 'class-validator';

export class UserDto {
    @IsString()
    fullname: string
    
    @IsString()
    username: string

    @IsString()
    bio: string

    @IsString()
    dp_uri:string
    
    @IsArray()
    @IsString({each:true})
    skills:string[]

    @IsArray()
    @IsString({each:true})
    experience:string[]
}

export class UpdateUserDto extends PartialType(UserDto){}