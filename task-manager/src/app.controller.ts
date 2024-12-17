import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service'; // Make sure this import is correct

@Controller()
export class AppController {
  constructor(private appService: AppService) {} // AppService must be provided

  @Get()
  getRootRoute() {
    return this.appService.getHello();
  }
}
