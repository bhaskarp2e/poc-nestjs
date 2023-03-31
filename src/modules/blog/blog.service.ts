import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { MongooseError } from 'src/common/constants/enums';
import { ErrorMessage } from 'src/common/constants/error.message';
import { Blogs, BlogDocument } from './blog.schema';
import { PostBlog } from './dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel(Blogs.name) private blogSchema: Model<BlogDocument>
    ) { }

    async postBlog(dto:PostBlog,user){

        try{
            const resp = await this.blogSchema.create({...dto,authorId:user._id});
            // console.log("postBlog",resp);
            return resp;
        }catch(err){
            
            if(err?.code== MongooseError.duplicate){
                throw ErrorMessage.blogSchema.duplicateeTitle;
            }
            throw err;
        }


    }


    async details(id:string){

        try{
            const resp = await this.blogSchema.findById(id).populate({path: 'authorId',
            model: 'AuthUser',
            select: { 'password':0, '__v':0}});
            return resp;
        }catch(err){

            if(err?.kind== "ObjectId"){
                // console.log("checkErrId",err);
                throw ErrorMessage.collectionSchema.mongoObjId;
            }
            // if (err?.message instanceof mongoose.Error.CastError){
            //                     console.log("checkErrId",err);

            //     throw ErrorMessage.collectionSchema.mongoObjId;
            // }
            throw err;
        }


    }
}
