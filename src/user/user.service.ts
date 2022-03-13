import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ){}

    async getUsers(): Promise<User[]>{
        return this.userModel.find().exec();
    }

    async getUser(id: string): Promise<User>{
      return this.userModel.findById(id);
    }

    async createUser(dto): Promise<User>{
      return new this.userModel(dto).save();
    }

    async updateUser(id: string, dto): Promise<any>{
      return this.userModel.findByIdAndUpdate(id, dto);
    }
  
    async deleteUser(id: string): Promise<void> {
      await this.userModel.findByIdAndDelete(id);
    }
  
    async deleteUsers(): Promise<void> {
      await this.userModel.deleteMany();
    }
}