import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { ValidationError } from 'class-validator';
import * as express from 'express';
import { Server } from 'http';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './shared/filters/all.exception.filter';
import { MappingInterceptor } from './shared/interceptors/mapping.interceptor';

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
const binaryMimeTypes: string[] = [];

let cachedServer: Server;

process.on('unhandledRejection', reason => {
  console.error(reason);
});

process.on('uncaughtException', reason => {
  console.error(reason);
});

async function bootstrapServer(): Promise<Server> {
  if (!cachedServer) {
    try {
      const expressApp = express();
      const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp), { cors: true });
      nestApp.use(eventContext());
      nestApp.setGlobalPrefix('/api');
      nestApp.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          exceptionFactory: (errors: ValidationError[]) => {
            if (errors.length > 0) {
              return new HttpException('유효하지 않은 파라미터', HttpStatus.BAD_REQUEST);
            }
          },
        }),
      );
      nestApp.useGlobalInterceptors(new MappingInterceptor());
      nestApp.useGlobalFilters(new AllExceptionsFilter());
      await nestApp.init();
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  return Promise.resolve(cachedServer);
}

export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
