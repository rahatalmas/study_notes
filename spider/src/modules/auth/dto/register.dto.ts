import {IsEmail,IsNotEmpty, IsString} from 'class-validator';

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