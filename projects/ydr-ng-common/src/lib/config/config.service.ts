import { Injectable, Inject } from '@angular/core';
import { Config } from './config.payload';
import { Observable, of } from 'rxjs';
import { Environment } from '../environment/environment';
import { ENVIRONMENT } from '../environment/environment.module';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string;

  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment
  ) {
    this.apiUrl = this.environment.apiUrl;
  }

  get(): Observable<Config> {
    return of({
      apiUrl: this.apiUrl
    });
  }
}
