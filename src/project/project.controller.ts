import { Controller, Get, Render } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('api/project')
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Get('viewAllProjects')
  @Render('viewProjects')
  async getAllProjectsController() {
    return { projects: await this.service.getAllProjects() };
  }
}
