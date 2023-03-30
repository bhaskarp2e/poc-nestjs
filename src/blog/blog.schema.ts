// import { Entity, Column, PrimaryGeneratedColumn, ColumnTypeUndefinedError } from "typeorm";

// @Entity()
// export class Auth{
//     @PrimaryGeneratedColumn()
//     id:number;

//     @Column()
//     name:string;

//     @Column()
//     description:string;

//     @Column()
//     isPublished:boolean;
// }

import { Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Document } from "mongoose";
import { AuthUser } from "src/auth/auth.schema";

// export type AuthUser = HydratedDocument<AuthUserClass>;

// export type DemoDocument = Demo & Document;


@Schema()
export class Blog{

    @Prop({type:String, required:true, unique:true, minlength:8, maxlength:15})
    title:string;

    @Prop({type:String, required:true})
    description:string;

    @Prop({type:mongoose.Schema.Types.ObjectId, required:true, ref:'AuthUser'})
    authorId:AuthUser;


}

export type BlogDocument = Blog & Document;

export const BlogSchema = SchemaFactory.createForClass(Blog);

