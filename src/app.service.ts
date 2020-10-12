import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): any {
    this.logger.log('현재 실행환경: ' + process.env.stage);
    return {
      title: 'Hello World!',
    };
  }
}
