import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

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

  async getEmployeePerformanceHistory(pageDetails: {
    emp_id: string;
    page: string;
    perPage: string;
  }) {
    const { page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    const employee_id = parseInt(pageDetails.emp_id);

    const performanceDetails = await this.prisma.performance.findMany({
      where: {
        Employee: {
          employee_id: employee_id,
        },
      },
      take: perPageData,
      skip: skip,
    });

    return performanceDetails;
  }
}
