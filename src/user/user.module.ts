import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../shared/guards/auth.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [SharedModule, AuthModule],
})
export class UserModule {}
