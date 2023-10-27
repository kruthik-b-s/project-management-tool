import { Module } from '@nestjs/common';
import { LeavesController } from './leave.controller';
import { LeavesService } from './leave.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LeavesController],
  providers: [LeavesService,PrismaService]
})
export class LeavesModule {}
