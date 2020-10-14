import { Injectable } from '@angular/core';
import { Config } from './config.payload';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: 'http://api.localhost';

  constructor() { }

  get(): Observable<Config> {
    return of({
      apiUrl: this.apiUrl
    });
  }
}
