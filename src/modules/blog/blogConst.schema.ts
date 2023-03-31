import * as mongoose from 'mongoose';
import { AuthUser } from '../../modules/auth/auth.schema';


export const BlogSchema = new mongoose.Schema({
    title: {type:String, required:true, unique:true, minlength:8, maxlength:15},
    description: {type:String, required:true},
    // author:{type:mongoose.Schema.Types.ObjectId, required:true, ref:'AuthUser'}
});