import { Controller, Get, Render } from '@nestjs/common';
import { LeavesService } from './leave.service';

@Controller('api/leaves')
export class LeavesController {

        constructor(private service: LeavesService) {}

        @Get('viewAllLeaves')
        @Render('leaveRequests')
        async getAllLeaveDetails() {
          const leaves = await this.service.getAllLeaves();
          console.log("-------->>> ",leaves)
          return { leaves : leaves };
        }
      }
      
