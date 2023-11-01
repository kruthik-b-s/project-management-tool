import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from "src/auth/dto's/auth.dto";

@Controller('api/employee')
export class EmployeeController {
  constructor(private service: EmployeeService) {}

  @Get('addEmployee')
  @Render('addEmployee')
  addNewEmployeeController() {}

  @Post('createEmployee')
  // @Render('addEmployee')
  async createNewEmployee(@Body() userDetails: CreateEmployeeDto) {
    try {
      const employee = await this.service.createEmployee(userDetails);
      return employee;
    } catch (error) {
      throw new Error(error.message);
    }
  }

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
}
