import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Get('/:id')
  getEmployeeDetailsByIdController(@Param('id') id: string) {
    try {
      return this.service.getEmployeeDetailsById(parseInt(id));
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
}
