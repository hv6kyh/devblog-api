import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [SharedModule],
})
export class PostModule {}
