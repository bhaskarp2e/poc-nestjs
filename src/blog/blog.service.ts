import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { PostBlog } from './dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel(Blog.name) private blogSchema: Model<BlogDocument>
    ) { }

    async postBlog(dto:PostBlog){

        try{
            const resp = await this.blogSchema.create(dto);
            console.log("postBlog",resp);
            return resp;
        }catch(err){
            
            throw err;
        }


    }


    async details(id:String){

        try{
            const resp = await this.blogSchema.findById(id);
            console.log("postBlog",resp);
            return resp;
        }catch(err){
            
            throw err;
        }


    }
}
