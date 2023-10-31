import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeePerformanceService {
  constructor(private prisma: PrismaService) {}

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

    const performanceCount = await this.prisma.performance.count({
      where: {
        Employee: {
          employee_id: employee_id,
        },
      },
    });

    return {
      performanceDetails: performanceDetails,
      totalPages: Math.ceil(performanceCount / perPageData),
    };
  }

  async addEmployeeRating(
    emp_id: string,
    ratingObj: { rating: string; comments: string; monthYear: string },
  ) {
    const { rating, comments, monthYear } = ratingObj;
    const [year, month] = monthYear.split('-');

    const performanceRating = await this.prisma.performance.create({
      data: {
        rating: parseInt(rating),
        comments: comments,
        for_month: parseInt(month),
        for_year: parseInt(year),
        given_by_employee_id: 1,
        Employee: {
          connect: {
            employee_id: parseInt(emp_id),
          },
        },
      },
    });

    return performanceRating;
  }
}
