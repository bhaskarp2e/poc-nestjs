import { IsNotEmpty, IsString } from "class-validator";
import * as mongoose from "mongoose";


export class PostBlog{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    description:string
}


export class PostId{
    @IsString()
    @IsNotEmpty()

    id:string
}