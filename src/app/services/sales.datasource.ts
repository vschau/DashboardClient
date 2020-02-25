import { IPaginationQuery } from 'src/app/models/IPaginationQuery';
import { ICustomerOrderResponse } from '../models/ICustomerOrderResponse';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { SalesDataService } from './sales-data.service';
import { catchError, finalize } from 'rxjs/operators';
import { CollectionViewer } from '@angular/cdk/collections';

export class SalesDataSource extends DataSource<ICustomerOrderResponse> {
  private dataSubject = new BehaviorSubject<ICustomerOrderResponse[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private salesDataService: SalesDataService) { super(); }

  loadData(paginationQuery: IPaginationQuery) {

    this.loadingSubject.next(true);

    this.salesDataService.getOrders(paginationQuery).pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(res => {
        console.log(res.totalPages)
        this.dataSubject.next(res.data);
        this.countSubject.next(res.totalCount);
      });

  }

  connect(collectionViewer: CollectionViewer): Observable<ICustomerOrderResponse[]> {
    console.log('Connecting data source');
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }
}
