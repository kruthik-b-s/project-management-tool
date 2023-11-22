import { Injectable } from '@nestjs/common';
import { CreateNotes, CreateProjectDto } from "src/dto's/auth.dto";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async createProjectWithDetails(projectDetails: CreateProjectDto) {
    const techStack = projectDetails.tech_stack.split(',');

    const project = await this.prisma.project.create({
      data: {
        project_name: projectDetails.project_name,
        client: projectDetails.client,
        start_date: new Date(projectDetails.start_date),
        end_date: new Date(projectDetails.end_date),
        project_details: {
          create: {
            project_url: projectDetails.project_url,
            login_name: projectDetails.login_name,
            login_password: projectDetails.login_password,
            tech_stack: techStack,
          },
        },
      },
    });

    return project;
  }

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

  async getProjectById(project_id: string) {
    return await this.prisma.project.findUnique({
      where: {
        project_id: parseInt(project_id),
      },
      include: {
        project_details: {
          select: {
            project_detail_id: true,
            notes: true,
            project_url:true,
            tech_stack:true,
          },
        },
      },
    });
  }

  async addNotesToProject(project_id: string, notes: CreateNotes) {
    const project = await this.prisma.project.findUnique({
      where: {
        project_id: parseInt(project_id),
      },
      include: {
        project_details: {
          select: {
            project_detail_id: true,
          },
        },
      },
    });

    const projectDetails = await this.prisma.projectDetail.update({
      where: {
        project_detail_id: project.project_details.project_detail_id,
      },
      data: {
        notes: notes.notes,
      },
    });

    return {
      projectDetails,
      project: await this.getProjectById(project.project_id.toString()),
    };
  }


}
