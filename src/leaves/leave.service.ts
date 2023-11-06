import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaveDto } from "src/dto's/leave.dto";

@Injectable()
export class LeavesService {
  constructor(private prisma: PrismaService) {}

  async getAllLeaves(status: { pending: string }) {
    let statusCondition;
    if (status.pending === 'true') statusCondition = 'pending';
    else statusCondition = { not: 'pending' };

    const leaves = await this.prisma.leaveApplication.findMany({
      where: {
        status: statusCondition,
      },
    });
    return leaves;
  }

  async getMyReporteesLeaves(emp_id: number, status: { pending: string }) {
    let statusCondition;
    if (status.pending === 'true') statusCondition = 'pending';
    else statusCondition = { not: 'pending' };

    const reportingEmployees = await this.prisma.employee.findMany({
      where: {
        reporting_to_employee_id: emp_id,
      },
      select: {
        employee_id: true,
      },
    });

    const reportingEmployeesId = reportingEmployees.map((employee) => {
      return employee.employee_id;
    });

    const leaves = await this.prisma.leaveApplication.findMany({
      where: {
        leave_application_employee_id: {
          in: reportingEmployeesId,
        },
        status: statusCondition,
      },
    });

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

  async createLeave(leaveDetails: LeaveDto) {
    try {
      const id = +leaveDetails.leave_application_employee_id;
      const t_date = new Date(leaveDetails.till_date).toISOString();
      const f_date = new Date(leaveDetails.from_date).toISOString();
      await this.prisma.leaveApplication.create({
        data: {
          leave_application_employee_id: id,
          leave_type: leaveDetails.leave_type,
          from_date: f_date,
          till_date: t_date,
          reason: leaveDetails.reason,
        },
      });
      return { message: 'Leave applied sucessfully' };
    } catch (error) {
      return { message: 'Failed to apply leave', error: error.message };
    }
  }

  async getLeavetype() {
    const id = 1;
    return await this.prisma.leave.findUnique({
      where: {
        employee_leave_id: id,
      },
      select: {
        casual_leaves: true,
        sick_leaves: true,
        floater_leaves: true,
      },
    });
  }
}
