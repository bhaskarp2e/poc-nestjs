import { Body, Controller, Get, HttpCode, Post,Req,Res, Param, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Request,Response } from 'express';
import { PostBlog } from './dto';
import { JwtGuard } from 'src/common/guard';
import { ErrorMessage } from 'src/common/constants/error.message';
import { CurrentUser } from 'src/common/decorators/current.user';

@Controller('blog')
export class BlogController {

    constructor(private blogService: BlogService) {
    }

    @UseGuards(JwtGuard)
    @Post('new')
    async postBlog( @Body() dto :PostBlog,  @Req() req:Request, @Res({passthrough: true}) res: Response){

        try{

            // console.log(dto,req.user)
            const resp = await this.blogService.postBlog(dto,req.user);
            res.status(200).json({success:true, body:resp})

        }catch(err){
            throw err;
            res.status(404).json({success:false, body:{error:err, msg:err?.message}});

        }
    }

    @UseGuards(JwtGuard)
    @Get('/:id')
    async details( @Param('id') id:string, @CurrentUser() user){

        try{
            // console.log("/:id",id,user)
           const resp = await this.blogService.details(id);
            // res.status(200).json({success:true, body:{data:resp}})
            return {success:true, body:{data:resp}};

        }catch(err){
            throw err;
            
            // return {success:false, body:{error:{err:err,message:err?.message}}}
            // res.status(404).json({success:false, body:{error:err, msg:err?.message}});

        }
    }

}
