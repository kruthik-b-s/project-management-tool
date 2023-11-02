import { Module } from '@nestjs/common';
import { EmployeePerformanceService } from './employee-performance.service';
import { EmployeePerformanceController } from './employee-performance.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeService } from 'src/employee/employee.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    EmployeePerformanceService,
    PrismaService,
    EmployeeService,
    JwtService,
  ],
  controllers: [EmployeePerformanceController],
})
export class EmployeePerformanceModule {}
