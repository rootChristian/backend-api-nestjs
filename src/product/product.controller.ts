import { Body, Controller, DefaultValuePipe, Delete, Get, Header, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { isDateString } from 'class-validator';
import { ProductDto } from 'src/dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        //@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
        ) {}

    @Post(':id/like')
    @Header('Cache-Control', 'none')
    async like(@Param('id', new DefaultValuePipe(false)) id: string){
        // Get product by id
        const product= await this.productService.getProduct(id);
        // Increment likes of the product getting
        const product_liked = await this.productService.updateProduct(id, {likes: product.likes + 1});
        // Return product liked
        return product_liked;
    }

    @Get(':id')
    @Header('Cache-Control', 'none')
    async getProduct(@Param('id', new DefaultValuePipe(false)) id: string){
        // Call service to get single product from db
        const product = await this.productService.getProduct(id);
        // Use RabbitMQ to send single product to backend-client
        // return single product 
        return product;
    }

    @Get()
    @Header('Cache-Control', 'none')
    async getProducts(){
        // Call service to get all product from db
        const products = await this.productService.getProducts();
        // Use RabbitMQ to send all product getting to backend-client
        // this.client.emit('product_get_all', products);
        // return single product 
        return products;
    }

    @Post()
    @Header('Cache-Control', 'none')
    async createProduct(@Body() dto: ProductDto){
        // Call service to add product to db
        dto.updatedAt = new Date((new Date()).getTime() + 24*60*60*1000);
        const product = await this.productService.createProduct(dto);
        // Use RabbitMQ to send product to backend-client
        //this.client.emit('product_created', product);
        // return product saving
        return product;
    }

    @Put(':id')
    @Header('Cache-Control', 'none')
    async updateProduct(@Param('id', new DefaultValuePipe(false)) id: string,
                        @Body() dto: ProductDto){
        // Call service to update and add product to db
        dto.updatedAt = new Date((new Date()).getTime() + 24*60*60*1000);
        await this.productService.updateProduct(id, dto);
        // Call service to get product updating
        const product = await this.productService.getProduct(id);
        // return product updating
        return product;
    }

    @Delete(':id')
    @Header('Cache-Control', 'none')
    async deleteProduct(@Param('id', new DefaultValuePipe(false)) id: string){
        // Call service to delete product from db
        const product = await this.productService.deleteProduct(id);
        // Return product empty
        return product;
    }

    @Delete()
    @Header('Cache-Control', 'none')
    async deleteProducts(){
        // Call service to delete all product from db
        const product = await this.productService.deleteProducts();
        // Return product list empty
        return product;
    }
}
