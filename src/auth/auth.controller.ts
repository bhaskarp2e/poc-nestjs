import { Body, Controller, HttpCode, Param, Post, Res } from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginInDto, SignUpDto, UpdateDto, UpdateUserDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('signUp')
    async signUp(@Body() dto:SignUpDto, @Res({passthrough: true}) res: Response) {
        try{ 
            const resp =   await this.authService.signUp(dto);
    
            res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
           res.status(400).json({success:false, body:{error:err, msg:err?.message}});

        }
       

    }

    @Post('signIn')
    async signIn(@Body() dto:LoginInDto, @Res({passthrough: true}) res: Response) {
        try{
            const resp = await this.authService.login(dto);;
            res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
            res.status(404).json({success:false, body:{error:err, msg:err?.message}});
        }
       

    }

    @Patch('update/:id')
    async updateUser(@Param('id')id, @Res({passthrough: true}) res: Response) {
        try{
            const resp = await this.authService.updateUser(id);
             res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
             res.status(404).json({success:false, body:{error:err, msg:err?.message}});
        }
       

    }

    @Patch('modify/:id')
    async updateUserDat(@Param('id') id: string, @Body() dto: UpdateUserDto, @Res({passthrough: true}) res: Response) {
        try{
            const resp = await this.authService.updateUserData(id,dto);
             res.status(200).json({success:true, body:{data:resp}});
        }catch(err){
             res.status(404).json({success:false, body:{error:err, msg:err?.message}});
        }
       

    }

}