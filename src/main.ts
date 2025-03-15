import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { CatchEverythingFilter } from './common/AllFilterException';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  const adapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(adapter));
  const config = new DocumentBuilder()
    .setTitle('TODO-list project')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('api')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config);
  await writeFile(
    join(process.cwd(), '/swagger.json'),
    JSON.stringify(documentFactory),
    'utf-8',
  );
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log('http://localhost:' + process.env.PORT || 3001);
  });
}
bootstrap();
