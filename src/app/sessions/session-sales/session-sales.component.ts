import { Component, OnInit, OnDestroy } from '@angular/core';
import { SalesDataService } from './../../services/sales-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-session-sales',
  templateUrl: './session-sales.component.html',
  styleUrls: ['./session-sales.component.css']
})
export class SessionSalesComponent implements OnInit, OnDestroy {
  salesDataByCustomer: any;
  salesDataByState: any;
  private ngUnsubscribe = new Subject();

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit() {
    this.salesDataService.getOrdersByCustomer(5)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res) => {
            // console.log('salesDataByCustomer', res);
            this.salesDataByCustomer = res.map( o => ({ name: o.name, total: o.total }));
          },
          (err) => console.log('error', err)
        );

    this.salesDataService.getOrdersByState()
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (res) => {
            // console.log('salesDataByState', res);
            this.salesDataByState = res;
          },
          (err) => console.log('error', err)
        );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
