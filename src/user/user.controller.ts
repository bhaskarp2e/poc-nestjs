import { Body, Controller, Param, Patch, Res, Get, Headers   } from '@nestjs/common';
import { Response } from 'express';
import { UpdateUserDto } from 'src/auth/dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {


    constructor(private userService: UserService) {
    }

    @Get('profile')
    async profile( @Headers() headers, @Res({passthrough: true}) res: Response) {
        try{ 
            console.log("userProfile",headers)

            const resp =   await this.userService.profile(headers['authorization']);
    
            res.status(200).json({success:true, body:{data:"resp"}});
        }catch(err){
           res.status(400).json({success:false, body:{error:err, msg:err?.message}});

        }
       

    }

    @Patch('modify/:id')
    async updateUserDat(@Param('id') id: string, @Body() dto: UpdateUserDto, @Res({passthrough: true}) res: Response) {
        try{
            const resp = await this.userService.updateUserData(id,dto);
             res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
             res.status(404).json({success:false, body:{error:err, msg:err?.message}});
        }
       

    }
}
