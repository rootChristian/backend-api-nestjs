import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqps://rvsuu:5yxssjygsdtpJvR93IEqjhTu8Ki5@goose.rmq.cloudamqp.org/vnuw'],
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
