import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dashboard')
  getDashboard(): string {
    return this.appService.getDashboard();
  }

  @Get('feature-a')
  getFeatureA(): string {
    return this.appService.getFeatureA();
  }

  @Get('feature-b')
  getFeatureB(): string {
    return this.appService.getFeatureB();
  }

  @Get('feature-c')
  getFeatureC(): string {
    return this.appService.getFeatureC();
  }

  @Get('settings')
  getSettings(): string {
    return this.appService.getSettings();
  }
}
