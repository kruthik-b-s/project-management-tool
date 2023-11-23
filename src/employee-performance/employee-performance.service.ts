import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeePerformanceService {
  constructor(private prisma: PrismaService) {}

  async getEmployeePerformanceHistory(pageDetails: {
    emp_id: string;
    filter: string;
    page: string;
    perPage: string;
  }) {
    const { filter, page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    const employee_id = parseInt(pageDetails.emp_id);

    const { performanceDetails, performanceCount } =
      await this.getPerformanceDetailsAndCount(employee_id, perPageData, skip);

    if (filter === '3') {
      const { startMonth, startYear, endMonth, endYear } =
        this.getLastMonths(3);

      const lastThreeMonths = performanceDetails.filter((performance) => {
        const range =
          performance.for_month >= startMonth &&
          performance.for_year >= startYear &&
          performance.for_month <= endMonth &&
          performance.for_year <= endYear;

        return range;
      });

      return {
        performanceDetails: lastThreeMonths,
        totalPages: Math.ceil(performanceCount / perPageData),
      };
    } else if (filter === '6') {
      const { startMonth, startYear, endMonth, endYear } =
        this.getLastMonths(6);

      const lastSixMonths = performanceDetails.filter((performance) => {
        const range =
          performance.for_month >= startMonth &&
          performance.for_year >= startYear &&
          performance.for_month <= endMonth &&
          performance.for_year <= endYear;

        return range;
      });

      return {
        performanceDetails: lastSixMonths,
        totalPages: Math.ceil(performanceCount / perPageData),
      };
    } else if (filter === 'year') {
      const { startMonth, startYear, endMonth, endYear } =
        this.getLastMonths(12);

      const lastYear = performanceDetails.filter((performance) => {
        const range =
          (performance.for_month >= startMonth ||
            performance.for_year >= startYear) &&
          (performance.for_month <= endMonth ||
            performance.for_year <= endYear);

        return range;
      });

      return {
        performanceDetails: lastYear,
        totalPages: Math.ceil(performanceCount / perPageData),
      };
    }

    return {
      performanceDetails: performanceDetails,
      totalPages: Math.ceil(performanceCount / perPageData),
    };
  }

  async getPerformanceDetailsAndCount(
    emp_id: number,
    take: number,
    skip: number,
  ) {
    const performanceDetails = await this.prisma.performance.findMany({
      where: {
        Employee: {
          employee_id: emp_id,
        },
      },
      take: take,
      skip: skip,
    });

    const performanceCount = await this.prisma.performance.count({
      where: {
        Employee: {
          employee_id: emp_id,
        },
      },
    });

    return { performanceDetails, performanceCount };
  }

  getLastMonths(n: number) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const startDate = new Date(year, month - n, 1);
    const endDate = new Date(year, month, 0);

    const startMonth = startDate.getMonth() + 1;
    const startYear = startDate.getFullYear();

    const endMonth = endDate.getMonth() + 1;
    const endYear = endDate.getFullYear();

    return {
      startMonth,
      startYear,
      endMonth,
      endYear,
    };
  }

  async addEmployeeRating(manager_id:number,
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
        given_by_employee_id: manager_id,
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
