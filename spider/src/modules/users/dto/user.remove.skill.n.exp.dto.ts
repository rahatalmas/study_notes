import { IsNotEmpty, IsString } from "class-validator"

export class UserSkillNExpRemoveDto{
    @IsNotEmpty()
    @IsString()
    uId: string 

    @IsNotEmpty()
    @IsString()
    key: string
}