import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  it('delegates to AppService methods', () => {
    const service: AppService = {
      getHello: () => 'Hello World!',
      getDashboard: () => 'Dashboard data',
      getFeatureA: () => 'Feature A data',
      getFeatureB: () => 'Feature B data',
      getFeatureC: () => 'Feature C data',
      getSettings: () => 'Settings data',
    } as AppService;

    const controller = new AppController(service);

    expect(controller.getHello()).toBe('Hello World!');
    expect(controller.getDashboard()).toBe('Dashboard data');
    expect(controller.getFeatureA()).toBe('Feature A data');
    expect(controller.getFeatureB()).toBe('Feature B data');
    expect(controller.getFeatureC()).toBe('Feature C data');
    expect(controller.getSettings()).toBe('Settings data');
  });
});
