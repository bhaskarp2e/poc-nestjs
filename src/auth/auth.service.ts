import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto, LoginInDto, UpdateDto, UpdateUserDto } from './dto';
import { AuthUser, AuthSchema, AuthDocument } from './auth.schema';
import * as argon from 'argon2';

@Injectable()
export class AuthService {


    constructor(@InjectModel(AuthUser.name) private authSchema: Model<AuthDocument>, private jwt:JwtService, private config:ConfigService
       ) { }


    async userDetails(dto: {id:string}): Promise<any> {

        try {
            const getUser = await this.authSchema.findById({ _id: dto });

            if (!getUser) {
                throw Error("User not found");
            }
            getUser.password=undefined;
            return getUser;

        } catch (err) {
            console.log("errorUpdateUser", err?.message)
            throw err;

        }
    }

    async signUp(dto: SignUpDto): Promise<AuthUser> {

        try {

            const hashPass = await argon.hash(dto.password);
            const createdUser = new this.authSchema({ ...dto, password: hashPass });
            let respUser = await createdUser.save();
            respUser.password = undefined;
            const jwtToken = await this.signToken(respUser._id, respUser.email);
            console.log(jwtToken);
            return respUser;

        } catch (err) {
            throw err;

        }


    }


    async login(dto: LoginInDto): Promise<AuthUser> {

        try {
            const getUser = await this.authSchema.findOne({ email: dto.email });

            if (!getUser) {
                throw Error("User not found");
            }

            const userMatch = await argon.verify(String(getUser.password), dto.password)

            if (!userMatch) {
                throw Error("Credentials invalid");

            }

            getUser.password = undefined;

            return getUser;

        } catch (err) {
            throw err;

        }
    }


    async updateUser(dto: UpdateDto): Promise<any> {

        try {
            console.log("getData", dto);
            const getUser = await this.authSchema.updateOne({ _id: dto }, { lastName: "lastname" });


            console.log("gotData", getUser);

            if (!getUser) {
                throw Error("User not found");
            }
            return getUser;

        } catch (err) {
            console.log("errorUpdateUser", err?.message)
            throw err;

        }
    }

    async updateUserData(id: String, dto: UpdateUserDto): Promise<any> {

        try {
            const getUser = await this.authSchema.updateOne({ _id: id }, { ...dto });



            if (!getUser) {
                throw Error("User not found");
            }
            return getUser;

        } catch (err) {
            throw err;

        }
    }

    async deleteUser(dto: {id:string}): Promise<any> {

        try {
            const delUser = await this.authSchema.findOneAndDelete({ _id: dto });

            if (!delUser) {
                throw Error("User not found");
            }
            delUser.password=undefined;
            return delUser;

        } catch (err) {
            console.log("errorUpdateUser", err?.message)
            throw err;

        }
    }

    async signToken(id:string, email:string):Promise<{access_token:string}>{

        const payLoad = {
            id,
            email
        }
        const secretJwt = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payLoad,{
            expiresIn:'1d',
            secret:secretJwt
        });

        return {
            access_token:token
        }
    }


}
