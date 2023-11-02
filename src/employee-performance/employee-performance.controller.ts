import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EmployeePerformanceService } from './employee-performance.service';
import { EmployeeService } from 'src/employee/employee.service';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('api/employee-performance')
export class EmployeePerformanceController {
  constructor(
    private service: EmployeePerformanceService,
    private employeeService: EmployeeService,
  ) {}

  @Get('employeePerformanceHistory')
  @Render('employeePerformance')
  async getEmployeePerformanceHistory(
    @Query()
    pageDetails: {
      emp_id: string;
      filter: string;
      page: string;
      perPage: string;
    },
  ) {
    const performanceHistory =
      await this.service.getEmployeePerformanceHistory(pageDetails);

    const employeeDetails = await this.employeeService.getEmployeeDetailsById(
      parseInt(pageDetails.emp_id),
    );

    return {
      performanceHistory: performanceHistory,
      employee: employeeDetails,
    };
  }

  @Post('addRating')
  async addRatingToEmployee(
    @Res() res: Response,
    @Query() emp_id: { emp_id: string },
    @Body() ratingObj: { rating: string; comments: string; monthYear: string },
  ) {
    await this.service.addEmployeeRating(emp_id.emp_id, ratingObj);
    res.redirect('/api/employee/viewAllEmployees?page=1&perPage=8');
  }
}
