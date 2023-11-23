import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('main')
  index() {
    return { loginMessage: ' Login to Project Management Tool' };
  }
}
