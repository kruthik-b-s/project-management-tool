import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeaveDto } from "src/dto's/leave.dto";
import { errorMonitor } from 'events';
import { error } from 'console';

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
      console.log(error.message);
      return { message: 'Failed to apply leave', error: error.message };
    }
  }

  async updateLeave(leaveId, leaveType) {
    // console.log("service-->>",leaveId,"",leaveType)
    leaveId = parseInt(leaveId);
    try {
      const leavesDB = await this.prisma.leave.findUnique({
        where: {
          employee_leave_id: leaveId,
        },
      });
      // console.log("service  leavesDB  -->>",leavesDB)
      if (leavesDB[leaveType] > 0) {
        leavesDB[leaveType] -= 1;
      } 
      const updatedLeavesDB = await this.prisma.leave.update({
        where: {
          employee_leave_id: leaveId,
        },
        data: {
          sick_leaves: leavesDB.sick_leaves,
          casual_leaves: leavesDB.casual_leaves,
          floater_leaves: leavesDB.floater_leaves,
        },
      });
      console.log('  service  updatedLeavesDB  -->>', updatedLeavesDB);
    } catch (error) {
      console.log(error.message);
    }
  }

  async getLeavetype(id) {
    return await this.prisma.leave.findUnique({
      where: {
        employee_leave_id: id,
      },
      select: {
        employee_leave_id: true,
        casual_leaves: true,
        sick_leaves: true,
        floater_leaves: true,
      },
    });
  }
}
