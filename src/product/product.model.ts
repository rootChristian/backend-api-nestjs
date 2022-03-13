import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmpty } from "class-validator";
import { Document, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({type: Number, unique: true, min: 1})
    id: number;

    @Prop({type: String, required: true })
    title: string;

    @Prop({type: String, required: true })
    image: string;

    @Prop({type: Number, default: 0})
    likes: number;

    @Prop({type: Date, default: Date.now, required: true})
    createdAt: Date;
  
    @Prop({type: Date, default: IsEmpty})
    updatedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);