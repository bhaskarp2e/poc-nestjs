import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../auth.service';

@Injectable()
export class AuthMid implements NestMiddleware {



   async use(req: Request, res: Response, next: NextFunction) {

      const token = req.headers['authorization'];
      console.log("AuthMid",token)

      // if(!req.headers['authorization']){
      //    throw Error('Unauthorized');
      // }
      // console.log('Executing request...');
      const resp = await new Promise<void>((resolve)=>{
         setTimeout(()=>{
            console.log("awaitingAsync");
            resolve()
         },1000);
         
      })

      // const respUser = await this.authService.validUser()
      

      // return res.status(401).json({success:false,body:{error:"",msg:"Unauthorized"}})
      next();
   }
}