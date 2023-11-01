import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, JwtService, JwtUtils],
})
export class ProjectModule {}
