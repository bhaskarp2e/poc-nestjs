import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto, LoginInDto, UpdateDto, UpdateUserDto } from './dto';
import { AuthUser, AuthSchema, AuthDocument } from './auth.schema';
import * as argon from 'argon2';

@Injectable()
export class AuthService {


    constructor(@InjectModel(AuthUser.name) private authSchema: Model<AuthDocument>) {}


    async signUp(dto:SignUpDto): Promise<AuthUser> {

        try{

            const hashPass = await argon.hash(dto.password);
            const createdUser = new this.authSchema({...dto, password:hashPass});
            let respUser = await createdUser.save();
            delete respUser.password;
            return respUser;

        }catch(err){
            throw err;

        }

       
      }


    async login(dto:LoginInDto): Promise<AuthUser>{

        try{
            const getUser =  await this.authSchema.findOne({email:dto.email});

            if(!getUser){
                throw Error("User not found");
            }

            const userMatch =  await argon.verify(String(getUser.password), dto.password)

            if(!userMatch){
                throw Error("Credentials invalid");

            }

            delete getUser.password;
           
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
