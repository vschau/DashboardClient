import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SalesDataService {
  baseUrl = 'http://localhost:44391/api/order/';
  httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  
}
