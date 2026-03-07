import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { ProviderEnum, UserRoleEnum } from "src/common/enum/user.enum";
import { types } from "util";


@Schema({ timestamps: true , toJSON: { virtuals: true ,transform(doc: any, ret: any) {

  delete ret.firstName;
  delete ret.lastName;
  delete ret._id;
  return ret;
  
}, }, toObject: { virtuals: true } })
export class User {

    @Prop({ type: String, minlength: 2 , maxlength: 20})
    firstName: string;

    // @Prop({ type: String, minlength: 2 , maxlength: 20})
    // lastName: string;
    
    @Prop({ type: String, required: true, unique: true })
    email: string;
    
    @Prop({ type: String, required: function () { return this.provider === ProviderEnum.GOOGLE ? false : true; } , minlength: 3 , maxlength: 8})
    password: string;

    @Prop({ type: String , enum:ProviderEnum , default: ProviderEnum.LOCAL})
    provider: string;
    
    @Prop({ type: String , enum:UserRoleEnum , default: UserRoleEnum.USER})
    role: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.virtual('fullName').get(function() {
//   return `${this.firstName} ${this.lastName}`;
// });

export type UserDocument = HydratedDocument<User>;

export const UserModel = MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]);