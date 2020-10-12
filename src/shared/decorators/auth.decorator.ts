import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RoleAuthGuard } from '../guards';

export const Auth = () => {
  return applyDecorators(UseGuards(JwtAuthGuard, RoleAuthGuard));
};
