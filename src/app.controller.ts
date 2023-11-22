import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('main')
  index() {
    return { message: ' Login to Project Management Tool' };
  }
}
