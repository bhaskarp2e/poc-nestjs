import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { PostBlog } from './dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel(Blog.name) private blogSchema: Model<BlogDocument>
    ) { }

    async postBlog(dto:PostBlog,user){

        try{
            const resp = await this.blogSchema.create({...dto,authorId:user._id});
            console.log("postBlog",resp);
            return resp;
        }catch(err){
            
            throw err;
        }


    }


    async details(id:string){

        try{
            const resp = await this.blogSchema.findById(id).populate({path: 'authorId',
            model: 'AuthUser',
            select: { 'password':0, '__v':0},});
            return resp;
        }catch(err){
            
            throw err;
        }


    }
}
