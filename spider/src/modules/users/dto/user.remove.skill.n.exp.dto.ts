import { IsNotEmpty, IsString } from "class-validator"

//dto for removing any skill or experience.
//used in removeSkill and removeExperience controller for getting body data
export class UserSkillNExpRemoveDto{
    @IsNotEmpty()
    @IsString()
    uId: string 

    @IsNotEmpty()
    @IsString()
    key: string
}