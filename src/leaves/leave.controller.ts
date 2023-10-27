import { Body, Controller, Get, Param, Post, Put, Query, Redirect, Render } from '@nestjs/common';
import { LeavesService } from './leave.service';

@Controller('api/leaves')
export class LeavesController {

        constructor(private service: LeavesService) {}

        @Get('viewAllLeaves')
        @Render('leaveRequests')
        async getAllLeaveDetails() {
          const leaves = await this.service.getAllLeaves();
          // console.log("-------->>> ",leaves)
          return { leaves : leaves };
        }


        @Get('statusUpdate')
        @Redirect('viewAllLeaves')
        async UpdateLeaveStatus(@Query('id') id:number , @Query('status') updatedStatus: string){
            // console.log("id---->>",id)
            // console.log("status---->>",updatedStatus)
           const leaveStatus = await this.service.UpdateStatus(id,updatedStatus);
            console.log(leaveStatus)
          
        }

      }
      
