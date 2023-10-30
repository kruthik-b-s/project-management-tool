import { Body, Controller, Get, Param, Post, Put, Query, Redirect, Render } from '@nestjs/common';
import { LeavesService } from './leave.service';
interface StatusUpdate{
  id:number;
  status:string;
  comments:string;
}
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


        @Post('statusUpdate')
        @Redirect('viewAllLeaves')
        async UpdateLeaveStatus(@Body() newStatus: StatusUpdate){
            // console.log("id---->>",id)
            // console.log("status---->>",updatedStatus)
      
            this.service.UpdateStatus(newStatus.id,newStatus.status,newStatus.comments);

        }



      }
      
