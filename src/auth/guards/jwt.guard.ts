import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.cookies['accessToken'];

    try {
      await this.jwt.verifyAsync(accessToken, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
