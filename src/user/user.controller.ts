import { Body, Controller, DefaultValuePipe, Delete, Get, Header, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import  * as argon from 'argon2';
import { UserDto } from 'src/dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        //@Inject('PRODUCT_SERVICE') private readonly client: ClientProxy
        ) {}

    @Get(':id')
    @Header('Cache-Control', 'none')
    async getUser(@Param('id', new DefaultValuePipe(false)) id: string){
        // Call service to get single product from db
        const user = await this.userService.getUser(id);
        // Use RabbitMQ to send single product to backend-client
        // return single product 
        return user;
    }

    @Get()
    @Header('Cache-Control', 'none')
    async getUsers(){
        // Call service to get all product from db
        const users = await this.userService.getUsers();
        // Use RabbitMQ to send all product getting to backend-client
        // this.client.emit('product_get_all', products);
        // return single product 
        return users;
    }

    @Post()
    @Header('Cache-Control', 'none')
    async createUser(@Body() dto: UserDto){
        // Hash password
        dto.password = await argon.hash(dto.password);
        // Set date updated
        //dto.updatedAt = new Date((new Date()).getTime() + 24*60*60*1000);
        // Call service to add product to db
        const user = await this.userService.createUser(dto);
        // Use RabbitMQ to send product to backend-client
        //this.client.emit('product_created', product);
        // return product saving
        return user;
    }

    @Put(':id')
    @Header('Cache-Control', 'none')
    async updateUser(@Param('id', new DefaultValuePipe(false)) id: string,
                        @Body() dto: UserDto){
        // Set date updated
        dto.updatedAt = new Date((new Date()).getTime() + 24*60*60*1000);
        // Hash password updated
        if(dto.password)    dto.password = await argon.hash(dto.password);
        // Call service to update and add product to db
        await this.userService.updateUser(id, dto);
        // Call service to get product updating
        const user = await this.userService.getUser(id);
        // return product updating
        return user;
    }

    @Delete(':id')
    @Header('Cache-Control', 'none')
    async deleteUser(@Param('id', new DefaultValuePipe(false)) id: string){
        // Call service to delete product from db
        const user = await this.userService.deleteUser(id);
        // Return product empty
        return user;
    }

    @Delete()
    @Header('Cache-Control', 'none')
    async deleteUsers(){
        // Call service to delete all product from db
        const user = await this.userService.deleteUsers();
        // Return product list empty
        return user;
    }
}
