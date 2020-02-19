import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IOrder } from '../models/IOrder';
import { map, catchError } from 'rxjs/operators';
import { IPaginationQuery } from '../models/IPaginationQuery';


@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  baseUrl = 'https://localhost:44391/api/orders';
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private httpClient: HttpClient) {}

  getOrders(paginationQuery: IPaginationQuery): Observable<any> {
    console.log('get orders');
    return this.httpClient.get(`${this.baseUrl}?PageNumber=${paginationQuery.pageNumber}&PageSize=${paginationQuery.pageSize}`)
        .pipe(catchError(this.handleError));
  }

  getOrdersGrpByCustomer(n: number) {
  }

  getOrdersGrpByState() {
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