import { Body, Controller, Param, Patch, Req,Res, Get, Headers, UseGuards   } from '@nestjs/common';
import { Request,Response } from 'express';
import { UpdateUserDto } from 'src/modules/auth/dto';
import { JwtGuard } from 'src/common/guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private userService: UserService) {
    }

    @UseGuards(JwtGuard)
    @Get('profile')
    async profile( @Req() req:Request, @Res({passthrough: true}) res: Response) {
        try{ 

            const resp =   await this.userService.profile(req.user);
    
             res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
             res.status(400).json({success:false, body:{error:err, msg:err?.message}});

        }
       

    }

    @UseGuards(JwtGuard)
    @Patch('modify/:id')
    async updateUserDat(@Param('id') id: string, @Req() req:Request, @Body() dto: UpdateUserDto, @Res({passthrough: true}) res: Response) {
        try{
            console.log("updateUserDat",req.user)

            const resp = await this.userService.updateUserData(id,dto);
             res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
             res.status(404).json({success:false, body:{error:err, msg:err?.message}});
        }
       

    }
}
