import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LeavesService } from './leave.service';
import { Request, Response } from 'express';
import { LeaveDto } from "src/dto's/leave.dto";
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { StatusUpdateDto } from "src/dto's/statusUpdate.dto";
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@UseGuards(JwtGuard)
@Controller('api/leaves')
export class LeavesController {
  constructor(
    private service: LeavesService,
    private jwtUtil: JwtUtils,
  ) {}

  @Get('viewAllLeaves')
  async getAllLeaveDetails(
    @Req() req: Request,
    @Query() status: { pending: string },
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);

      let leaves;
      if (payload['role'] === 'superadmin') {
        leaves = await this.service.getAllLeaves(status);
      } else {
        leaves = await this.service.getMyReporteesLeaves(
          payload['sub'],
          status,
        );
      }

      if (leaves.length == 0) {
        res.render('leaveRequests', { message: 'No pending approvals' });
      } else {
        res.render('leaveRequests', { leaves: leaves });
      }
    } catch (error) {
      throw new Error(error.message);
    }
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
  async CompletedLeaves(
    @Req() req: Request,
    @Query() status: { pending: string },
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);
      let leaves;
      if (payload['role'] === 'superadmin') {
        leaves = await this.service.getAllLeaves(status);
      } else {
        leaves = await this.service.getMyReporteesLeaves(
          payload['sub'],
          status,
        );
      }

      if (leaves.length == 0) {
        res.render('leaveRequests', { message: 'No leaves approved' });
      } else {
        res.render('leaveRequests', { leaves: leaves });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('addLeave')
  // @Render('add-leave')
  async getLeavetype(@Res() res: Response, @Req() req: Request) {
    const payload = await this.jwtUtil.getTokenPayload(req);
    let id = payload["sub"];
    console.log(payload["sub"])
    const leaves = await this.service.getLeavetype(id);
    res.render("add-leave",{leaves: leaves})
  }
  // LeaveForm() {}
  

  @Post('createLeaveform')
  @Render('homeUser')
  createLeave(@Body() leaveDetails: LeaveDto) {
    console.log(leaveDetails)
    try {
      this.service.createLeave(leaveDetails);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // @Get('getleaveType')
  // async getLeavetype(@Res() res: Response) {
  //   const leaves = await this.service.getLeavetype();
  //   res.render("add-leave",{leaves: leaves})
  // }
}
