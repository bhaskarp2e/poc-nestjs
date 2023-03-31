import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blogs, BlogSchema } from './blog.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name:Blogs.name, schema: BlogSchema }])],
    controllers: [BlogController],
    providers: [BlogService],

})
export class BlogModule {}
