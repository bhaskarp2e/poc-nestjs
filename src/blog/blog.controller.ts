import { Body, Controller, Get, HttpCode, Post,Req,Res, Param, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request,Response } from 'express';
import { PostBlog } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) {
    }

    @UseGuards(JwtGuard)
    @Post('new')
    async postBlog( @Body() dto :PostBlog,  @Req() req:Request, @Res({passthrough: true}) res: Response){

        try{

            console.log(dto)
            const resp = await this.blogService.postBlog(dto);
            res.status(200).json({success:true, body:resp})

        }catch(err){
            res.status(404).json({success:false, body:{error:err, msg:err?.message}});

        }
    }

    @UseGuards(JwtGuard)
    @Get('/:id')
    async details( @Param('id') id,  @Req() req:Request, @Res({passthrough: true}) res: Response){

        try{

           const resp = await this.blogService.details(id);
            res.status(200).json({success:true, body:{data:resp}})

        }catch(err){
            res.status(404).json({success:false, body:{error:err, msg:err?.message}});

        }
    }

}
