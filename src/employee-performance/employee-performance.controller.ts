import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EmployeePerformanceService } from './employee-performance.service';
import { EmployeeService } from 'src/employee/employee.service';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@UseGuards(JwtGuard)
@Controller('api/employee-performance')
export class EmployeePerformanceController {
  constructor(
    private service: EmployeePerformanceService,
    private employeeService: EmployeeService,
    private jwtUtil: JwtUtils,
  ) {}

  @Get('employeePerformanceHistory')
  @Render('employeePerformance')
  async getEmployeePerformanceHistory(
    @Req() req: Request,
    @Query()
    pageDetails: {
      emp_id: string;
      filter: string;
      page: string;
      perPage: string;
    },
  ) {
    try {
      if (pageDetails.emp_id === '') {
        const payload = await this.jwtUtil.getTokenPayload(req);
        pageDetails.emp_id = payload['sub'].toString();
      }

      const performanceHistory =
        await this.service.getEmployeePerformanceHistory(pageDetails);

      const employeeDetails = await this.employeeService.getEmployeeDetailsById(
        parseInt(pageDetails.emp_id),
      );

      return {
        performanceHistory: performanceHistory,
        employee: employeeDetails,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('addRating')
  async addRatingToEmployee(
    @Res() res: Response,
    @Req() req: Request,
    @Query() emp_id: { emp_id: string },
    @Body() ratingObj: { rating: string; comments: string; monthYear: string },
  ) {
    const payload = await this.jwtUtil.getTokenPayload(req);
    const manager_id = payload['sub']
    await this.service.addEmployeeRating(manager_id,emp_id.emp_id, ratingObj);
    res.redirect('/api/employee/viewAllEmployees?page=1&perPage=8');
  }
}
