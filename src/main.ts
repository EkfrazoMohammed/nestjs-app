import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { Logger , ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
 
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'uploads')); // Serve static files
 
  
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.enableCors();  // If needed for CORS issues
  app.useGlobalPipes(new ValidationPipe());  // For validation
  app.enableVersioning();  // If using versions
  app.setGlobalPrefix('api');  // If using global prefix


  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
