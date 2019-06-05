import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

import mockPrograms from '../mocks/programs.mock';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
  ) { }

  private getApiUrl(serviceName: string): string {
    const services = {
      'programs-service': environment.programs_service_api,
    };
    const apiUrl = services[serviceName];

    return apiUrl;
  }

  get(
    serviceName: string,
    path: string
  ): Observable<any> {
    console.log(`ApiService GET: ${serviceName} : ${path}`);

    const apiUrl = this.getApiUrl(serviceName);

    // Add 'fallback' for tests
    if (apiUrl === '' && serviceName === 'programs-service') {
      return of(mockPrograms);
    }
  }
}
