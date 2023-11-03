import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LeavesService } from './leave.service';
import { Response } from 'express';
import { LeaveDto } from "src/dto's/leave.dto";
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { StatusUpdateDto } from "src/dto's/statusUpdate.dto";

@UseGuards(JwtGuard)
@Controller('api/leaves')
export class LeavesController {
  constructor(private service: LeavesService) {}

  @Get('viewAllLeaves')
  async getAllLeaveDetails(@Res() res: Response) {
    const leaves = await this.service.getAllLeaves();
    if (leaves.length == 0) {
      return res.send('<h1>No Leave Approval Pending</h1>');
    }
    res.render('leaveRequests', { leaves: leaves });
  }

  @Post('statusUpdate')
  async UpdateLeaveStatus(
    @Body() newStatus: StatusUpdateDto,
    @Res() res: Response,
  ) {
    await this.service.UpdateStatus(
      newStatus.id,
      newStatus.status,
      newStatus.comments,
    );
    res.redirect('viewAllLeaves');
  }

  @Get('nonPendingLeaves')
  async CompletedLeaves(@Res() res: Response) {
    const leaves = await this.service.nonPendingLeaves();
    if (leaves.length == 0) {
      return res.send('<h1> Leave Approval Pending</h1>');
    }
    res.render('leaveRequests', { leaves: leaves });
  }

  @Get('addLeave')
  @Render('add-leave')
  LeaveForm() {}

  @Post('createLeaveform')
  @Render('homeUser')
  createLeave(@Body() leaveDetails: LeaveDto) {
    try {
      this.service.createLeave(leaveDetails);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('getleaveType')
  async getLeavetype() {
    return await this.service.getLeavetype();
  }
}
