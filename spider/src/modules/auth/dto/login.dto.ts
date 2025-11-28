import { IsEmail, IsNotEmpty, IsString } from "class-validator"

//dto for login
//used in login() controller
export class LoginDto{
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email: string 

    @IsNotEmpty()
    @IsString()
    password: string
}