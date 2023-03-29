import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthMid implements NestMiddleware {
   async use(req: Request, res: Response, next: NextFunction) {
      console.log("AuthMid",req.headers['authorization'])
      // console.log('Executing request...');
      const resp = await new Promise<void>((resolve)=>{
         setTimeout(()=>{
            console.log("awaitingAsync");
            resolve()
         },5000);
         
      })

      // return res.status(401).json({success:false,body:{error:"",msg:"Unauthorized"}})
      next();
   }
}