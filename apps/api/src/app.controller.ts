import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { FeatureFlagGuard } from './feature-flags/feature-flag.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), FeatureFlagGuard('hello'))
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('dashboard')
  @UseGuards(AuthGuard('jwt'), FeatureFlagGuard('home'))
  getDashboard(): string {
    return this.appService.getDashboard();
  }

  @Get('feature-a')
  @UseGuards(AuthGuard('jwt'), FeatureFlagGuard('feature-a'))
  getFeatureA(): string {
    return this.appService.getFeatureA();
  }

  @Get('feature-b')
  @UseGuards(AuthGuard('jwt'), FeatureFlagGuard('feature-b'))
  getFeatureB(): string {
    return this.appService.getFeatureB();
  }

  @Get('feature-c')
  @UseGuards(AuthGuard('jwt'), FeatureFlagGuard('feature-c'))
  getFeatureC(): string {
    return this.appService.getFeatureC();
  }

  @Get('settings')
  @UseGuards(AuthGuard('jwt'), FeatureFlagGuard('settings'))
  getSettings(): string {
    return this.appService.getSettings();
  }
}
