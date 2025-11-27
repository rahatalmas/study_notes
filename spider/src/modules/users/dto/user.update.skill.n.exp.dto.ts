import { IsNotEmpty, IsString } from "class-validator"

export class UserSkillNExpUpdateDto{
    @IsNotEmpty()
    @IsString()
    uId: string 

    @IsNotEmpty()
    @IsString()
    qType: string

    @IsNotEmpty()
    @IsString()
    key: string

    @IsNotEmpty()
    @IsString()
    value: string
}