import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Logout = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    request.session.destroy((err: any) => {
      console.error(err);
    });
    return true;
  },
);
