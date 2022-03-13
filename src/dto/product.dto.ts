import { IsDate, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class ProductDto {

   @IsNumber()
   id: number

   //@IsNotEmpty()
   @IsString()
   title: string;

   //@IsNotEmpty()
   @IsString()
   image: string;
   
   //@IsDate()
   //createdAt: Date;

   //@IsDate()
   updatedAt: Date;
/*
   //@IsNotEmpty()
   @IsNumber()
   likes?: number;*/
}