import { Body, Controller, Get, Post,Redirect, Render, Res } from '@nestjs/common';
import { LeavesService } from './leave.service';
import { Request, Response } from 'express';
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
        async getAllLeaveDetails(@Res() res:Response) {
          const leaves = await this.service.getAllLeaves();
          // console.log("-------->>> ",leaves)
          if(leaves.length == 0){
            res.send( "<h1>No Leave Approval Pending</h1>")
          }
          return { leaves : leaves };
        }


        @Post('statusUpdate')
        // @Redirect('viewAllLeaves')
        async UpdateLeaveStatus(@Body() newStatus: StatusUpdate,@Res() res: Response){
            // console.log("id---->>",id)
            // console.log("status---->>",updatedStatus)
            await this.service.UpdateStatus(newStatus.id,newStatus.status,newStatus.comments);
            res.redirect('viewAllLeaves');
        }



      }
      
