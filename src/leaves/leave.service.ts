import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaveDto } from './dto/leave.dto';

@Injectable()
export class LeavesService {
  constructor(private prisma: PrismaService) {}

  async getAllLeaves() {
    const leaves = await this.prisma.leaveApplication.findMany({
      where: {
        status: 'pending',
      },
      select: {
        leave_application_id:true,
        leave_application_employee_id: true,
        from_date: true,
        till_date: true,
        reason:true,
        status: true,
      },
    });
    console.log(leaves)
    // let employeeId =  getNameviaId()
    return leaves;
  }

  async UpdateStatus(id, updatedStatus, newComments) {
    id = parseInt(id);
    const updatedLeaveStatus = await this.prisma.leaveApplication.update({
      where: { leave_application_id: id },
      data: {
        status: updatedStatus,
        comments: newComments,
      },
    });
    return updatedLeaveStatus;
  }

  // async getNameviaId(id){
  //   const leaves = await this.prisma.leaveApplication.findMany({
  //     where: {
  //    leave_application_employee_id:id,
  //   },
  //   select:{
  //     Employee :{
  //       select :{
  //         employee_name : true,
  //       }
  //       }
  //     }
  // });
  // console.log("---->>",leaves)
  //   return leaves;
  // }

  async nonPendingLeaves() {
    const leaves = await this.prisma.leaveApplication.findMany({
      where: {
        status: { not: 'pending' },
      },
    });
    // let employeeId =  getNameviaId()
    return leaves;
  }

  async createLeave(leaveDetails: LeaveDto) {
    try {
      const id = +leaveDetails.leave_application_employee_id
      const t_date =  new Date(leaveDetails.till_date).toISOString()
      const f_date = new Date(leaveDetails.from_date).toISOString()
      let user = await this.prisma.leaveApplication.create({
        data: {
          leave_application_employee_id:id,
          leave_type: leaveDetails.leave_type,
          from_date: f_date,
          till_date: t_date,
          reason: leaveDetails.reason,
        },
      });      return { message: 'Leave applied sucessfully' };
    } catch (error) {
      return { message: 'Failed to apply leave', error: error.message };
    }
  }

  async getLeavetype(){
    const id = 1;
     return await this.prisma.leave.findUnique({
      where: {
        employee_leave_id: id,
      },
      select: {
        casual_leaves: true,
        sick_leaves:true,
        floater_leaves:true,
      },
    });
  }
}
