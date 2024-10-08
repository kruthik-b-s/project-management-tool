import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from "src/dto's/auth.dto";
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request, Response } from 'express';
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@UseGuards(JwtGuard)
@Controller('api/employee')
export class EmployeeController {
  constructor(
    private service: EmployeeService,
    private jwtUtil: JwtUtils,
  ) {}

  @Get('addEmployee')
  async addNewEmployeeController(@Req() req: Request, @Res() res: Response) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);

      if (payload['role'] === 'superadmin') res.render('addEmployee');
      else res.redirect('/pages/unauthorised.html');
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Post('createEmployee')
  async createNewEmployee(
    @Req() req: Request,
    @Body() userDetails: CreateEmployeeDto,
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);

      if (payload['role'] === 'superadmin') {
        const employee = await this.service.createEmployee(userDetails);
        res.render('homeSuperAdmin', {
          message: 'Created sucessfully',
          employee,
        });
      } else {
        res.redirect('/pages/unauthorised.html');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('getEmployee/:id')
  async getEmployeeDetailsByIdController(
    @Req() req: Request,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);
      const employee = await this.service.getEmployeeDetailsById(parseInt(id));

      if (payload['role'] === 'superadmin' || payload['role'] === 'admin') {
        console.log('Emp --->>>', employee);
        res.render('employeeDetails', { employee });
      } else {
        res.redirect('/pages/unauthorised.html');
      }
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
  async getAllEmployeeDetails(
    @Req() req: Request,
    @Query() pageDetails: { page: string; perPage: string },
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);

      if (payload['role'] === 'superadmin') {
        const employees = await this.service.getAllEmployeeDetails(pageDetails);
        res.render('viewEmployees', { employees });
      } else if (payload['role'] === 'admin') {
        const employees = await this.service.getAllReportingEmployees(
          payload['sub'],
          pageDetails,
        );
        res.render('viewEmployees', { employees });
      } else {
        res.redirect('/pages/unauthorised.html');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('employeesOnProject/:project_id')
  async getAllEmployeesOnProject(
    @Param('project_id') project_id: string,
    @Query() pageDetails: { page: string; perPage: string },
    @Res() res: Response,
  ) {
    const employees = await this.service.getAllEmployeesOnProject(
      project_id,
      pageDetails,
    );
    res.render('employeesOnProject', { employees });
  }

  @Post('updateEmployee/:id')
  async updateEmployeeDetails(
    @Param('id') id: number,
    @Body() FormData,
    @Res() res: Response,
  ) {
    await this.service.updateEmployeeDetails(id, FormData);
    res.redirect(`/api/employee/getEmployee/${id}`);
  }

  @Post('removeEmployee')
  async updateEmployeeProjectDetails(@Query() idObject, @Res() res: Response) {
    console.log('Controller working', idObject);
    await this.service.updateEmployeeProjectDetails(idObject);

    res.redirect(`/api/employee/getEmployee/${parseInt(idObject.employeeId)}`);
  }
}
