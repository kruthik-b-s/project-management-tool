import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('api/employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Get('getEmployee/:id')
  @Render('employeeDetails')
  async getEmployeeDetailsByIdController(@Param('id') id: string) {
    try {
      return {
        employee: await this.service.getEmployeeDetailsById(parseInt(id)),
      };
    } catch (error) {
      return {
        employee_id: null,
        employee_name: null,
        department: null,
        email: null,
        phone_number: null,
        employee_role_id: null,
        Role: {
          role_name: null,
        },
        projects: [],
      };
    }
  }

  @Get('viewAllEmployees')
  @Render('viewEmployees')
  async getAllEmployeeDetails(
    @Query() pageDetails: { page: string; perPage: string },
  ) {
    const employees = await this.service.getAllEmployeeDetails(pageDetails);
    return { employees };
  }

  @Get('employeePerformanceHistory')
  // @Render('employeePerformance')
  async getEmployeePerformanceHistory(
    @Query() pageDetails: { emp_id: string; page: string; perPage: string },
  ) {
    const performanceHistory =
      await this.service.getEmployeePerformanceHistory(pageDetails);

    const employeeDetails = await this.service.getEmployeeDetailsById(
      parseInt(pageDetails.emp_id),
    );

    return {
      performanceHistory: performanceHistory,
      employee: employeeDetails,
    };
  }
}
