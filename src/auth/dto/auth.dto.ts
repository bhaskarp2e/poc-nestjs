import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";

// export interface SignUpDto{
//     firstName:string,
//     lastName:string,
//     email:string,
//     password:string
// }

export class SignUpDto{
    @IsString()
    @IsNotEmpty()
    firstName:string

    @IsString()
    @IsNotEmpty()
    lastName:string

    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}

// export interface LoginInDto{
//     email:string,
//     password:string
// }
export class LoginInDto{
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string
}


export interface UpdateDto{
    id:string
}

export interface UpdateUserDto{
    firstName:string,
    lastName:string
}

