import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IServer } from '../models/IServer';
import { IServerRequest } from '../models/IServerRequest';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  baseUrl = 'https://localhost:44391/api/servers';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {
  }

  getServers(): Observable<IServer[]> {
    return this.httpClient.get<IServer[]>(this.baseUrl)
        .pipe(catchError(this.handleError));
  }

  updateServerStatus(request: IServerRequest): Observable<Response> {
    return this.httpClient.put<Response>(`${this.baseUrl}/${request.id}`, request, this.httpOptions)
               .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }
}
