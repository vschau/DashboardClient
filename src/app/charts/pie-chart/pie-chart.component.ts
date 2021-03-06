import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { THEME_COLORS } from 'src/app/shared/constants';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    }
  };
  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: this.themeColors('Bright'),
      borderColor: '#111'
    },
  ];

  @Input() saleData: any;
  @Input() limit: number;

  constructor() { }

  ngOnInit() {
    const subsetSaleData = this.saleData.slice(0, this.limit);
    this.pieChartLabels = subsetSaleData.map(d => Object.values(d)[0]);
    this.pieChartData = subsetSaleData.map(d => Object.values(d)[1]);
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.find(set => set.name === setName).colorSet;
    return c;
  }
}
