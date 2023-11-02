import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
} from '@nestjs/common';
import { LeavesService } from './leave.service';
import { Response } from 'express';
import { LeaveDto } from './dto/leave.dto';

@Controller('api/leaves')
export class LeavesController {
  constructor(private service: LeavesService) {}

  @Get('viewAllLeaves')
  @Render('leaveRequests')
  async getAllLeaveDetails(@Res() res: Response) {
    const leaves = await this.service.getAllLeaves();
    console.log('-------->>> ', leaves);
    if (leaves.length == 0) {
      res.send('<h1>No Leave Approval Pending</h1>');
    }
    return { leaves: leaves };
  }

  @Post('statusUpdate')
  // @Redirect('viewAllLeaves')
  async UpdateLeaveStatus(
    @Body() newStatus: StatusUpdateDto,
    @Res() res: Response,
  ) {
    // console.log("id---->>",id)
    // console.log("status---->>",updatedStatus)
    await this.service.UpdateStatus(
      newStatus.id,
      newStatus.status,
      newStatus.comments,
    );
    res.redirect('viewAllLeaves');
  }

  @Get('nonPendingLeaves')
  @Render('leaveRequests')
  async CompletedLeaves(@Res() res: Response) {
    const leaves = await this.service.nonPendingLeaves();
    if (leaves.length == 0) {
      res.send('<h1> Leave Approval Pending</h1>');
    }
    return { leaves: leaves };
  }

  @Get('addLeave')
  @Render('add-leave')
  // route possible for admin too
  LeaveForm() {}


  @Post('createLeaveform')
  @Render('homeUser')
  // route possible for admin too
  createLeave(@Body() leaveDetails: LeaveDto) {
    try {
      this.service.createLeave(leaveDetails);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('getleaveType')
  //pass in id 
  async getLeavetype() {
    return await this.service.getLeavetype();
  }

}
