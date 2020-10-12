import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [UserModule, SharedModule, PostModule, MenuModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
