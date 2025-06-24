import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from '@prisma/filters/catch';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const application_port = process.env.PORT ?? 3000;
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(application_port, () => {
    console.log(`Server is running on ${application_port} port`);
  });
}

bootstrap();
