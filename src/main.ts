import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://rvh:5yxssjy@goose.rmq.cloudamqp.org/vmh'],
        queue: 'queue',
        queueOptions: {
          durable: false
        },
      },
    }
  );

  app.listen();
  
}
bootstrap();
