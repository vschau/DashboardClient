import { IPaginationQuery } from './../../models/IPaginationQuery';
import { SalesDataService } from './../../services/sales-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, OnDestroy {
  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        }
      }],
      yAxes: [{
        ticks:{
          stepSize: 40,
        },
        gridLines: {
          display: false
        }
      }]
    }
  };
  // public barChartLabels: Label[] = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  paginationQuery: IPaginationQuery = {  filter: '', sortColumn: 'id', sortDirection: 'asc', pageIndex: 1, pageSize: 100 };
  private subscription = new Subscription();

  // public barChartData: ChartDataSets[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Q3 Sales' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Q4 Sales' }
  // ];
  public barChartData: ChartDataSets[];

  constructor(private salesDataService: SalesDataService) { }

  ngOnInit() {
    this.subscription = this.salesDataService.getOrders(this.paginationQuery).subscribe(
      (res) => {
        const localChartData = this.parseChartData(res);
        this.barChartLabels = Object.keys(localChartData);
        this.barChartData = [{ data: Object.values(localChartData) as Array<number>, label: 'Sales' }];
      },
      (err) => console.log('error', err)
    );
  }

  parseChartData(res: any) {
    const formattedOrders = res.data
      .sort(this.sortByDate)
      .map(d => ({ placed: moment(d.placed).format('MM/DD/YYYY'), total: d.total }));

    const chartData = formattedOrders.reduce((r, a) => {
      r[a.placed] ? r[a.placed] += a.total : r[a.placed] = a.total;
      return r;
    }, {});

    return chartData;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  sortByDate(a, b) {
    return (a.placed < b.placed) ? -1 : ((a.placed > b.placed) ? 1 : 0);
  }
}
