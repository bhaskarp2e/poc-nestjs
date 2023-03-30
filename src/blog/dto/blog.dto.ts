import { IsNotEmpty, IsString } from "class-validator";


export class PostBlog{
    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    description:string
}