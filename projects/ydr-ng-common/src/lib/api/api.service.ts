import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * The url of the api
   */
  apiUrl: string;

  constructor(
    private readonly httpService: HttpClient,
    private readonly configService: ConfigService
  ) {

  }

  /**
   * Composes the request url
   */
  composeRequestUrl(endpoint: string): Observable<string> {
    return this.configService.get().pipe(
      map(
        (config) => {
          this.apiUrl = config.apiUrl;
          return `${this.apiUrl}/${endpoint}`;
        }
      )
    );
  }

  /**
   * Executes a get request
   */
  get(endpoint: string, params?: HttpParams): Observable<any> {
    const sendOptions = params ? {params} : undefined;
  
    return this.composeRequestUrl(endpoint).pipe(
      switchMap(
        (requestUrl: string) => this.httpService.get(requestUrl, sendOptions)
      )
    );
  }

  /**
   * Executes a post request
   */
  post(endpoint: string, body: {}): Observable<any> {
    return this.composeRequestUrl(endpoint).pipe(
      switchMap(
        (requestUrl: string) => this.httpService.post(requestUrl, body)
      )
    );
  }
}
