import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtUtils {
  constructor(private jwt: JwtService) {}

  async getTokenPayload(req: Request) {
    const token = req.cookies['accessToken'];
    const payload = await this.jwt.decode(token);
    return payload;
  }
}
