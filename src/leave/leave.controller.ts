import { Controller, Get, Render } from '@nestjs/common';
import { LeavesService } from './leave.service';

@Controller('leaves')
export class LeavesController {

        constructor(private service: LeavesService) {}

        @Get('viewAllEmployees')
        @Render('viewEmployees')
        async getAllEmployeeDetails() {
          const employees = await this.service.getAllLeaves();
          return { employees: employees };
        }
      }
      
