import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionSerializer } from './utils/session.serializer';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  providers: [
    AuthService,
    JwtService,
    JwtAuthGuard,
    GoogleStrategy,
    PrismaService,
    SessionSerializer,
    String,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
