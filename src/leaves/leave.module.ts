import { Module } from '@nestjs/common';
import { LeavesController } from './leave.controller';
import { LeavesService } from './leave.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [LeavesController],
  providers: [LeavesService, PrismaService, JwtService],
})
export class LeavesModule {}
