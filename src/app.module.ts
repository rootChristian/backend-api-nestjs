import { Module } from '@nestjs/common';
//import { HttpModule } from '@nestjs/axios'
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USER}:${process.env.DB_USER_PASS}@g2qmr.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority` 
    ),
    ProductModule,
    UserModule,
    //HttpModule,
  ],
})
export class AppModule {}
