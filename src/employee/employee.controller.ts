import { Controller, Get, Param, Render } from '@nestjs/common';
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
  async getAllEmployeeDetails() {
    const employees = await this.service.getAllEmployeeDetails();
    return { employees: employees };
  }
}
