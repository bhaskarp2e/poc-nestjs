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

// export type AuthUser = HydratedDocument<AuthUserClass>;

// export type DemoDocument = Demo & Document;

export type AuthDocument = AuthUser & Document;

@Schema()
export class AuthUser{

    @Prop({type:String, required:true})
    firstName:string;

    @Prop({type:String, required:true})
    lastName:string;

    @Prop({type:String, required:true, unique:true})
    email:string;

    @Prop({type:String, required:true})
    password:String;

    //need to import Owner class schema
    // @Prop({type:mongoose.Schema.Types.ObjectId, ref:'testCol'})
    // owner: Owner
}

export const AuthSchema = SchemaFactory.createForClass(AuthUser);

