import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator';

export class UserDto {

   @IsNotEmpty()
   @IsNumber()
   id: number
   
   @IsString()
   @IsNotEmpty()
   firstname: string;

   @IsString()
   @IsNotEmpty()
   lastname: string;

   @IsEmail()
   @IsNotEmpty()
   email: string;

   @IsString()
   @IsNotEmpty()
   password: string;

   //@IsDate()
   //createdAt: Date;

   //@IsDate()
   updatedAt: Date;
/*
   //@IsNotEmpty()
   @IsNumber()
   likes?: number;*/
}