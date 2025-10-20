import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const buildSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Servi')
    .setDescription('The servi API description')
    .setVersion('1.0')
    .addTag('servi')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
};
