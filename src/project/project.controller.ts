import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtUtils } from 'src/auth/utils/jwt.utils';

@UseGuards(JwtGuard)
@Controller('api/project')
export class ProjectController {
  constructor(
    private service: ProjectService,
    private jwtUtil: JwtUtils,
  ) {}

  @Get('projects')
  async getAllProjectsController(
    @Req() req: Request,
    @Query() pageDetails: { status: string; page: string; perPage: string },
    @Res() res: Response,
  ) {
    try {
      const payload = await this.jwtUtil.getTokenPayload(req);

      // const projects = await this.service.getAllProjects(pageDetails);
      let projects;
      if (payload['role'] === 'superadmin') {
        projects = await this.service.getAllProjects(pageDetails);
      } else {
        projects = await this.service.getAllMyProjects(
          payload['sub'],
          pageDetails,
        );
      }

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
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
