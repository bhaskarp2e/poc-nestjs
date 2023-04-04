import {  Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Cache } from 'cache-manager';
import mongoose, { Model } from 'mongoose';
import { CacheService } from 'src/common/config/cache/cache.service';
import { ConfigurationService } from 'src/common/config/config.service';
import { MongooseError } from 'src/common/constants/enums';
import { ErrorMessage } from 'src/common/constants/error.message';
import { Blogs, BlogDocument } from './blog.schema';
import { PostBlog } from './dto';

@Injectable()
export class BlogService {

    constructor(@InjectModel(Blogs.name) private blogSchema: Model<BlogDocument>,
    // private readonly configService: ConfigurationService,
    // @Inject(CACHE_MANAGER) private cacheModule: Cache
    // @Inject(CACHE_MANAGER) private cacheModule: Cache
    private readonly cacheService: CacheService
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

            // const redisData = await this.cacheModule.get('testKey');
            // console.log("redisKey",redisData)
            // await this.cacheModule.set(
            //     "testKey",
            //     JSON.stringify({
            //       otp: 123456
            //     }),
            //     20000
            //   );
            const respRedisBefore = await this.cacheService.getValue('test');
            console.log("checkKeyBefore",respRedisBefore)

            await this.cacheService.setValue('test',{test:1234},5)
            const respRedis = await this.cacheService.getValue('test');

            console.log("checkKeyAfter",respRedis)


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
