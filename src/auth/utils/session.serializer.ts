import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { CreateEmployeeDto } from "../dto's/auth.dto";
import { VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private service: AuthService) {
    super();
  }

  serializeUser(user: CreateEmployeeDto, done: VerifyCallback) {
    done(null, user);
  }

  deserializeUser(payload: any, done: VerifyCallback) {
    const user = this.service.findUserByEmail(payload.email);
    console.log(user);
    if (!user) done(null, null);
    done(null, user);
  }
}
