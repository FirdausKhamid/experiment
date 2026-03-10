import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getDashboard(): string {
    return 'Dashboard data';
  }

  getFeatureA(): string {
    return 'Feature A data';
  }

  getFeatureB(): string {
    return 'Feature B data';
  }

  getFeatureC(): string {
    return 'Feature C data';
  }

  getSettings(): string {
    return 'Settings data';
  }
}
