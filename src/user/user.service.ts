import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDto, LoginInDto, UpdateDto, UpdateUserDto } from '../auth/dto';
import { AuthUser, AuthSchema, AuthDocument } from '../auth/auth.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel(AuthUser.name) private authSchema: Model<AuthDocument>, private config:ConfigService
    ) { }

    async profile(id:String): Promise<AuthUser> {

        try {
            const getUser = await this.authSchema.findById({ id: id });

            if (!getUser) {
                throw Error("User not found");
            }


            getUser.password = undefined;

            return getUser;

        } catch (err) {
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

}


