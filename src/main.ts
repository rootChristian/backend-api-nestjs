import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://rvncauuw:5ryzyxoZt9dtpJvR93IEqjhTu8Ki5H7h@goose.rmq2.cloudamqp.com/rvncauuw'],
        queue: 'main_queue',
        queueOptions: {
          durable: false
        },
      },
    }
  );

  app.listen();
  
}
bootstrap();
