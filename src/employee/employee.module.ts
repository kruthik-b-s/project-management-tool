import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@Module({
  controllers: [EmployeeController],
  providers: [EmployeeService, PrismaService, JwtService, JwtUtils],
})
export class EmployeeModule {}
