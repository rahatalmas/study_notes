import {IsEmail,IsNotEmpty, IsString} from 'class-validator';

//dto for registration
//used in register() controller
export class RegistrationDto {
    @IsNotEmpty()
    @IsString()
    fullname: string

    @IsNotEmpty()
    username: string
    
    @IsEmail()
    email: string
    
    @IsNotEmpty()
    @IsString()
    password: string
}