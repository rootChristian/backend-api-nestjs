import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmpty } from "class-validator";
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    @Prop({type: Number, unique: true, min: 1})
    id: number;

    @Prop({type: String, required: true })
    firstname: string;

    @Prop({type: String, required: true })
    lastname: string;

    @Prop({type: String, required: true, unique: true })
    email: string;

    @Prop({type: String, required: true })
    password: number;

    @Prop({type: Date, default: Date.now, required: true})
    createdAt: Date;
  
    @Prop({type: Date})
    updatedAt!: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);