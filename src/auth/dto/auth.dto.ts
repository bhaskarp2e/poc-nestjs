import { ObjectId } from "mongoose";

export interface SignUpDto{
    firstName:String,
    lastName:String,
    email:String,
    password:String
}

export interface LoginInDto{
    email:String,
}


export interface UpdateDto{
    id:String,
}

export interface UpdateUserDto{
    firstName:String,
    lastName:String
}

