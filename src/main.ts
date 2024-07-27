import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(compression());

  const options = new DocumentBuilder()
    .setTitle('Order API')
    .setDescription('Code challenge Shipix Tech')
    .setVersion('1.0.0')
    .addTag('order')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 2500);
}
bootstrap();
