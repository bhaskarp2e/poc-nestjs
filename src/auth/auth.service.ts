import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto, LoginInDto, UpdateDto, UpdateUserDto } from './dto';
import { AuthUser, AuthSchema, AuthDocument } from './auth.schema';

@Injectable()
export class AuthService {


    constructor(@InjectModel(AuthUser.name) private authSchema: Model<AuthDocument>) {}


    async signUp(dto:SignUpDto): Promise<AuthUser> {

        try{

            const createdUser = new this.authSchema(dto);
            return await createdUser.save();

        }catch(err){
            throw err;

        }

       
      }


    async login(dto:LoginInDto): Promise<AuthUser>{

        try{
            const getUser =  await this.authSchema.findOne({email:dto.email}, {password:0}).lean();

            if(!getUser){
                throw Error("User not found");
            }
            return getUser;

        }catch(err){
            throw err;

        }
    }


    async updateUser(dto:UpdateDto): Promise<any>{

        try{
            console.log("getData",dto);
            const getUser =  await this.authSchema.updateOne({_id:dto},{lastName:"lastname"});


            console.log("gotData",getUser);

            if(!getUser){
                throw Error("User not found");
            }
            return getUser;

        }catch(err){
            console.log("errorUpdateUser",err?.message)
            throw err;

        }
    }
    
    async updateUserData(id:String, dto:UpdateUserDto): Promise<any>{

        try{
            const getUser =  await this.authSchema.updateOne({_id:id},{...dto});



            if(!getUser){
                throw Error("User not found");
            }
            return getUser;

        }catch(err){
            throw err;

        }
    }

    
}
