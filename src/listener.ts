import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    //origin: 'http://localhost:5000'
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      //forbidNonWhitelisted: true,
      //disableErrorMessages:
       // process.env.NODE_ENV === 'production' ? true : false,
    }),
  );
  await app.listen(8000);
}
bootstrap();
