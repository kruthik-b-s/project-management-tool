import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Request, Response } from 'express';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtUtils } from 'src/auth/utils/jwt.utils';
import { CreateNotes, CreateProjectDto } from "src/dto's/auth.dto";

@UseGuards(JwtGuard)
@Controller('api/project')
export class ProjectController {
  constructor(
    private service: ProjectService,
    private jwtUtil: JwtUtils,
  ) {}

  @Post('addNewProject')
  async addNewProject(@Body() projectDetails: CreateProjectDto) {
    return this.service.createProjectWithDetails(projectDetails);
  }

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
        res.render('viewAllProjects', {
          projects,
          add: 'true',
        });
      } else {
        projects = await this.service.getAllMyProjects(
          payload['sub'],
          pageDetails,
        );
        res.render('viewAllProjects', {
          projects,
          add: 'false',
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('projectDetails/:project_id')
  @Render('projectDetails')
  async getProjectDetails(@Param('project_id') project_id: string) {
    return { project: await this.service.getProjectById(project_id) };
  }

  @Post('addNotes/:project_id')
  // @Render('projectDetails')
  async addNotesToProjectController(
    @Param('project_id') project_id: string,
    @Body() notes: CreateNotes,
    @Res() res: Response,
  ) {
    const projectDetails = await this.service.addNotesToProject(
      project_id,
      notes,
    );

    res.render('projectDetails', {
      projectDetails: projectDetails.projectDetails,
      project: projectDetails.project,
    });
  }
}
