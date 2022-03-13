import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>
    ){}

    async getProducts(): Promise<Product[]>{
        return this.productModel.find().exec();
    }

    async getProduct(id: string): Promise<Product>{
      return this.productModel.findById(id);
    }

    async createProduct(dto): Promise<Product>{
      return new this.productModel(dto).save();
    }

    async updateProduct(id: string, dto): Promise<any>{
      return this.productModel.findByIdAndUpdate(id, dto);
    }
  
    async deleteProduct(id: string): Promise<void> {
      await this.productModel.findByIdAndDelete(id);
    }
  
    async deleteProducts(): Promise<void> {
      await this.productModel.deleteMany();
    }
}