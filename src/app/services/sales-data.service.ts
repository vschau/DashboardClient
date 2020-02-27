import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IOrder } from '../models/IOrder';
import { map, catchError, delay } from 'rxjs/operators';
import { IPaginationQuery } from '../models/IPaginationQuery';


@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  baseUrl = 'https://localhost:44391/api/orders';

  constructor(private httpClient: HttpClient) {}

  getOrderCount(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`)
        .pipe(catchError(this.handleError));
  }

  getOrders(paginationQuery: IPaginationQuery): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}`, {
        params: new HttpParams()
          .set('filter', paginationQuery.filter)
          .set('sortColumn', paginationQuery.sortColumn)
          .set('sortDirection', paginationQuery.sortDirection)
          .set('pageIndex', paginationQuery.pageIndex.toString())
          .set('pageSize', paginationQuery.pageSize.toString())
    }).pipe(delay(1000), catchError(this.handleError));
  }

  getOrdersByCustomer(n: number): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bycustomer/${n}`)
        .pipe(catchError(this.handleError));
  }

  getOrdersByState(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/bystate`)
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
