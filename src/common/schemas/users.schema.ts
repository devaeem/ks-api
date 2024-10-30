import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from './base.schema';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Base {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({
    minlength: 6,
    maxlength: 120,
    required: true,
  })
  password: string;

  @Prop({ required: true })
  fname: string;

  @Prop({ required: true })
  lname: string;

  @Prop({ default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
