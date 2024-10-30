import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type BaseDocument = Base & Document;

@Schema({ timestamps: true })
export class Base {
  @Prop({
    type: String,
    default: uuidv4,
  })
  _id: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
