import { BaseExceptionFilter, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppInterceptor } from './common/interceptor/app.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { AppGuard } from './common/guard/app.guard';
import { ResponseInterceptor } from './common/interceptor/response.interceptor';
import { GlobalExceptionFilter } from './common/exception-filter/app.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors('*')
  app.useGlobalGuards(new AppGuard)
  app.useGlobalInterceptors(new AppInterceptor(),new ResponseInterceptor())
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true,
      forbidNonWhitelisted:true,
      forbidUnknownValues:true,
      //******have some questions about this options.....*******
      transform:true,
      // skipMissingProperties: true,
      // transformOptions: {
      //   exposeDefaultValues: false,
      //   excludeExtraneousValues: false
      // }
      // *******************************************************
    }
  ))
  app.useGlobalFilters(new GlobalExceptionFilter())
  await app.listen(process.env.PORT ?? 8000);
}

bootstrap();
