import { Controller, Get, Query, Res } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Response } from 'express';

@Controller('api/project')
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Get('projects')
  // @Render('viewAllProjects')
  async getAllProjectsController(
    @Query() pageDetails: { status: string; page: string; perPage: string },
    @Res() res: Response,
  ) {
    const projects = await this.service.getAllProjects(pageDetails);

    if (pageDetails.status === 'all') {
      res.render('viewAllProjects', {
        projects,
      });
    } else if (pageDetails.status === 'completed') {
      res.render('viewCompletedProjects', {
        projects,
      });
    } else if (pageDetails.status === 'on-going') {
      res.render('viewOngoingProjects', {
        projects,
      });
    }
  }
}
