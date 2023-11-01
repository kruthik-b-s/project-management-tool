import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    try {
      await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
