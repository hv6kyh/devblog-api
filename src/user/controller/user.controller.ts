import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequest, LoginResponse } from '../dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/signin')
  public signin(@Body() dto: LoginRequest): Promise<LoginResponse> {
    return this.userService.login(dto);
  }
}
