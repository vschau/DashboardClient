import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Subject } from 'rxjs';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { takeUntil } from 'rxjs/operators';
import { IPaginationQuery } from 'src/app/models/IPaginationQuery';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit, OnDestroy {
  // Display top 3 customers by sale volume.  A series for each customer that maps their order by day over some day range
  // public lineChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //   { data: [180, 480, 770, 90, 1000, 270, 400], label: 'Series C', yAxisID: 'y-axis-1' }
  // ];
  public lineChartData: ChartDataSets[];
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  paginationQuery: IPaginationQuery = { pageNumber: 1, pageSize: 100 };
  private ngUnsubscribe = new Subject();

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    // const dates = filteredOrders.map(x => x.placed).filter((value, index, self) => self.indexOf(value) === index).sort();
    this.salesDataService.getOrders(this.paginationQuery).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      res => {
        const orders = res.data;
        console.log('orders', res.data);

        this.salesDataService.getOrdersByCustomer(3).subscribe((cus) => {
            console.log('customers', cus);

            const customerDic = cus.reduce((r, a) => {
              r[a.customerId] = a.name;
              return r;
            }, {});

            const customerIds = cus.map(x => x.customerId);

            const formattedOrders = orders
              .filter(item => customerIds.indexOf(item.customerId) > -1)
              .reduce((r, a) => {
                if (!r[a.placed]) {
                  r[a.placed] = {
                    placed: moment(a.placed).format('MM/DD/YYYY'),
                    [customerIds[0]]: 0,
                    [customerIds[1]]: 0,
                    [customerIds[2]]: 0,
                  };
                }
                if (customerIds[0] === a.customerId) {
                  r[a.placed][customerIds[0]] += a.total;
                } else if (customerIds[1] === a.customerId) {
                  r[a.placed][customerIds[1]] += a.total;
                } else if (customerIds[2] === a.customerId) {
                  r[a.placed][customerIds[2]] += a.total;
                }
                return r;
              }, {});

            const result = [
              {data: [], label: customerDic[customerIds[0]]},
              {data: [], label: customerDic[customerIds[1]]},
              {data: [], label: customerDic[customerIds[2]]}
            ];
            Object.values(formattedOrders).forEach(item => {
              this.lineChartLabels.push(item['placed']);
              result[0].data.push(item[customerIds[0]]);
              result[1].data.push(item[customerIds[1]]);
              result[2].data.push(item[customerIds[2]]);
            });

            console.log('data', result);
            this.lineChartData = result;
          },
          (e) => console.log('error', e)
        );
      },
      (err) => console.log('error', err)
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
