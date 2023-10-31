import { Module } from '@nestjs/common';
import { EmployeePerformanceService } from './employee-performance.service';
import { EmployeePerformanceController } from './employee-performance.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  providers: [EmployeePerformanceService, PrismaService, EmployeeService],
  controllers: [EmployeePerformanceController],
})
export class EmployeePerformanceModule {}
