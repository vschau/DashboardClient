import { Component, OnInit } from '@angular/core';
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
    responsive: false,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    }
  };
  public pieChartLabels: Label[] = ['XYZ Logistics', 'Main St Bakery', 'Acme Hosting'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;

  public pieChartColors = [
    {
      backgroundColor: this.themeColors('Bright'),
      borderColor: '#111'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.find(set => set.name === setName).colorSet;
    return c;
  }
}
