import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from "src/dto's/auth.dto";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  async createEmployee(userDetails: CreateEmployeeDto) {
    try {
      let user = await this.prisma.employee.findUnique({
        where: {
          email: userDetails.email,
        },
      });

      const role = await this.prisma.role.findUnique({
        where: {
          role_name: userDetails.role,
        },
      });

      if (user) {
        return { message: 'Employee already exists' };
      }

      user = await this.prisma.employee.create({
        data: {
          employee_name: userDetails.employee_name,
          email: userDetails.email,
          department: userDetails.department,
          Role: {
            connect: {
              role_id: role.role_id,
            },
          },
          reporting_to_employee_id: parseInt(userDetails.reporting_employee_id),
        },
      });

      return { message: 'Employee created sucessfully' };
    } catch (error) {
      return { message: 'Failed to create employee', error: error.message };
    }
  }

  async getEmployeeDetailsById(id: number) {
    try {
      const employee = this.prisma.employee.findUnique({
        where: {
          employee_id: id,
        },
        include: {
          Role: {
            select: {
              role_name: true,
            },
          },
          projects: {
            select: {
              project_name: true,
              client: true,
              start_date: true,
              end_date: true,
            },
          },
        },
      });

      if (!employee) return { message: 'Employee details not found' };

      return employee;
    } catch (error) {
      return {
        message: 'Failed to get employee details',
        error: error.message,
      };
    }
  }

  async getAllEmployeeDetails(pageDetails: { page: string; perPage: string }) {
    const { page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    const employees = await this.prisma.employee.findMany({
      include: {
        performance: {
          select: {
            rating: true,
          },
        },
        projects: {
          select: {
            project_name: true,
          },
        },
      },
      take: perPageData,
      skip: skip,
    });

    const employeeCount = await this.prisma.employee.count();

    return {
      employees: employees,
      totalPages: Math.ceil(employeeCount / perPageData),
    };
  }

  async getAllReportingEmployees(
    emp_id: number,
    pageDetails: { page: string; perPage: string },
  ) {
    const { page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    const reportingEmployees = await this.prisma.employee.findMany({
      where: {
        reporting_to_employee_id: emp_id,
      },
      include: {
        performance: {
          select: {
            rating: true,
          },
        },
        projects: {
          select: {
            project_name: true,
          },
        },
      },
      take: perPageData,
      skip: skip,
    });

    const employeeCount = await this.prisma.employee.count({
      where: {
        reporting_to_employee_id: emp_id,
      },
    });

    return {
      employees: reportingEmployees,
      totalPages: Math.ceil(employeeCount / perPageData),
    };
  }

  async getAllEmployeesOnProject(
    project_id: string,
    pageDetails: { page: string; perPage: string },
  ) {
    const { page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    const employees = await this.prisma.employee.findMany({
      where: {
        projects: {
          some: {
            project_id: parseInt(project_id),
          },
        },
      },
      take: perPageData,
      skip: skip,
    });

    const employeeCount = await this.prisma.employee.count({
      where: {
        projects: {
          some: {
            project_id: parseInt(project_id),
          },
        },
      },
    });

    return {
      project_id,
      employees: employees,
      totalPages: Math.ceil(employeeCount / perPageData),
    };
  }
}
