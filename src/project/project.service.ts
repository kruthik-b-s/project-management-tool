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
      const projects = await this.prisma.project.findMany({
        where: { status },
        take: perPageData,
        skip: skip,
      });

      const totalDataCount = await this.prisma.project.count({
        where: {
          status: 'on-going',
        },
      });

      return {
        projects: projects,
        totalPages: Math.ceil(totalDataCount / perPageData),
      };
    } else if (status === 'completed') {
      const projects = await this.prisma.project.findMany({
        where: { status },
        take: perPageData,
        skip: skip,
      });

      const totalDataCount = await this.prisma.project.count({
        where: {
          status: 'completed',
        },
      });

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
}
