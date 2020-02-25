import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { IOrder } from 'src/app/models/IOrder';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { SalesDataSource } from 'src/app/services/sales.datasource';
import { IPaginationQuery } from 'src/app/models/IPaginationQuery';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-session-orders',
  templateUrl: './session-orders.component.html',
  styleUrls: ['./session-orders.component.css']
})
export class SessionOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'customerName', 'total', 'placed', 'completed', 'status'];
  // MatDataSource is for sorting, filtering and pagination of a client-sided array. Can't use this.
  // Follow this instead: https://blog.angular-university.io/angular-material-data-table/
  dataSource: SalesDataSource;

  // TODO: implement filter
  // todo: separate count as a different api call?
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private paginationQuery: IPaginationQuery = { sortColumn: 'id', sortDirection: 'asc', pageIndex: 1, pageSize: 5 };

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit() {
    this.dataSource = new SalesDataSource(this.salesDataService);
    this.dataSource.loadData(this.paginationQuery);
  }

  ngAfterViewInit() {
    this.dataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })
      )
      .subscribe();

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // filter
    // fromEvent(this.input.nativeElement, 'keyup')
    //   .pipe(
    //     debounceTime(150),
    //     distinctUntilChanged(),
    //     tap(() => {
    //       this.paginator.pageIndex = 0;

    //       this.loadOrdersPage();
    //     })
    //   )
    //   .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadOrdersPage())
      )
      .subscribe();

  }

  loadOrdersPage() {
    this.paginationQuery.sortColumn = this.sort.active;
    this.paginationQuery.sortDirection = this.sort.direction;
    this.paginationQuery.pageIndex = this.paginator.pageIndex + 1; // paginator starts at 0 pageIndex
    this.paginationQuery.pageSize = this.paginator.pageSize;

    this.dataSource.loadData(this.paginationQuery);
  }
}
