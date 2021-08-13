import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { Environment } from './environment';

export const ENVIRONMENT = new InjectionToken<Environment>('forRoot() Current environment.');

@NgModule({})
export class EnvironmentModule {
  static forRoot(environment: Environment): ModuleWithProviders<EnvironmentModule> {
    return {
      ngModule: EnvironmentModule,
      providers: [{ provide: ENVIRONMENT, useValue: environment }]
    };
  }
}
