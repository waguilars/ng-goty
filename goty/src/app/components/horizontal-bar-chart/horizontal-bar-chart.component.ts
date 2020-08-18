import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styles: [
    `
      .chart-container {
        display: 'grid';
        height: 300px;
      }
    `,
  ],
})
export class HorizontalBarChartComponent implements OnDestroy {
  results = [
    {
      name: 'Juego 1',
      value: 25,
    },
    {
      name: 'Juego 2',
      value: 15,
    },
    {
      name: 'Juego 3 ',
      value: 18,
    },
    {
      name: 'Juego 4 ',
      value: 28,
    },
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = 'nightLights';

  interval: any;

  constructor() {
    this.interval = setInterval(() => {
      console.log('object');
      this.results = this.results.map((item) => {
        item.value = Math.round(Math.random() * 100);
        return item;
      });
    }, 2000);
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  onSelect(event: any): void {
    console.log(event);
  }
}
