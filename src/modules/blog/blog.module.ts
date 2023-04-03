import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blogs, BlogSchema } from './blog.schema';
import { ConfigurationService } from 'src/common/config/config.service';

@Module({
    imports: [MongooseModule.forFeature([{ name:Blogs.name, schema: BlogSchema }])],
    controllers: [BlogController],
    providers: [BlogService, ConfigurationService],

})
export class BlogModule {}
