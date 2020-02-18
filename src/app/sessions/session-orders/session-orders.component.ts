import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { IOrder } from 'src/app/models/IOrder';

const orders: IOrder[] = [
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)},
  { id: 1, customer: { id: 1, name: 'John Doe', email: 'john@gmail.com', state: 'CO' }, total: 230, placed: new Date(2020, 2, 1), fulfilled: new Date(2020, 2, 10)}
];

@Component({
  selector: 'app-session-orders',
  templateUrl: './session-orders.component.html',
  styleUrls: ['./session-orders.component.css']
})
export class SessionOrdersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'customer', 'total', 'placed', 'fulfilled', 'status'];
  // MatDataSource is for sorting, filtering and pagination of a client-sided array. Can't use this.
  // Follow this instead: https://blog.angular-university.io/angular-material-data-table/
  dataSource: MatTableDataSource<IOrder>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(orders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
