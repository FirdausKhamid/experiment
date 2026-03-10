import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { FeatureFlagGuard } from './feature-flags/feature-flag.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(FeatureFlagGuard('hello'))
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dashboard')
  @UseGuards(FeatureFlagGuard('home'))
  getDashboard(): string {
    return this.appService.getDashboard();
  }

  @Get('feature-a')
  @UseGuards(FeatureFlagGuard('feature-a'))
  getFeatureA(): string {
    return this.appService.getFeatureA();
  }

  @Get('feature-b')
  @UseGuards(FeatureFlagGuard('feature-b'))
  getFeatureB(): string {
    return this.appService.getFeatureB();
  }

  @Get('feature-c')
  @UseGuards(FeatureFlagGuard('feature-c'))
  getFeatureC(): string {
    return this.appService.getFeatureC();
  }

  @Get('settings')
  @UseGuards(FeatureFlagGuard('settings'))
  getSettings(): string {
    return this.appService.getSettings();
  }
}
