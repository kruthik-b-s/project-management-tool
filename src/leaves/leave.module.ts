import { Module } from '@nestjs/common';
import { LeavesController } from './leave.controller';
import { LeavesService } from './leave.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@Module({
  controllers: [LeavesController],
  providers: [LeavesService, PrismaService, JwtService, JwtUtils],
})
export class LeavesModule {}
