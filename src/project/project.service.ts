import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAllProjects(pageDetails: {
    status: string;
    page: string;
    perPage: string;
  }) {
    const { status, page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    if (status === 'on-going') {
      const { projects, totalDataCount } = await this.getProjectsHavingStatus(
        status,
        perPageData,
        skip,
      );

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    } else if (status === 'completed') {
      const { projects, totalDataCount } = await this.getProjectsHavingStatus(
        status,
        perPageData,
        skip,
      );

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    } else if (status === 'all') {
      const projects = await this.prisma.project.findMany({
        take: perPageData,
        skip: skip,
      });

      const totalDataCount = await this.prisma.project.count();

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    }
  }

  async getAllMyProjects(
    emp_id: number,
    pageDetails: {
      status: string;
      page: string;
      perPage: string;
    },
  ) {
    const { status, page, perPage } = pageDetails;
    const pageNumber = parseInt(page);
    const perPageData = parseInt(perPage);
    const skip = (pageNumber - 1) * perPageData;

    if (status === 'on-going') {
      const { projects, totalDataCount } = await this.getMyProjectsHavingStatus(
        emp_id,
        status,
        perPageData,
        skip,
      );

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    } else if (status === 'completed') {
      const { projects, totalDataCount } = await this.getMyProjectsHavingStatus(
        emp_id,
        status,
        perPageData,
        skip,
      );

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    } else if (status === 'all') {
      const projects = await this.prisma.project.findMany({
        where: {
          employees: {
            some: {
              employee_id: {
                equals: emp_id,
              },
            },
          },
        },
        take: perPageData,
        skip: skip,
      });

      const totalDataCount = await this.prisma.project.count({
        where: {
          status: status,
        },
      });

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    }
  }

  async getProjectsHavingStatus(status: string, take: number, skip: number) {
    const projects = await this.prisma.project.findMany({
      where: { status },
      take: take,
      skip: skip,
    });

    const totalDataCount = await this.prisma.project.count({
      where: {
        status: status,
      },
    });

    return { projects, totalDataCount };
  }

  async getMyProjectsHavingStatus(
    emp_id: number,
    status: string,
    take: number,
    skip: number,
  ) {
    const projects = await this.prisma.project.findMany({
      where: {
        employees: {
          some: {
            employee_id: emp_id,
          },
        },
        status: status,
      },
      take: take,
      skip: skip,
    });

    const totalDataCount = await this.prisma.project.count({
      where: {
        status: status,
      },
    });

    return { projects, totalDataCount };
  }
}
