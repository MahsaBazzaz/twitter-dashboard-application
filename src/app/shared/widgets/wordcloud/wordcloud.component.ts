import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import wordcloud from 'highcharts/modules/wordcloud.js';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { ResponseSchema, Token } from 'src/dtos';
wordcloud(Highcharts);

@Component({
  selector: 'app-wordcloud',
  template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions" style="width: 100%; height: 300px; display: block;"></highcharts-chart>`,
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent {
  chartOptions: {};
  @Input() data: { name: string; weight: number; }[] = [];
  Highcharts = Highcharts;

  constructor(private cdr: ChangeDetectorRef, private dashboardService: DashboardService) { }

  chartRef: Highcharts.Chart;

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  fetchData(): Observable<ResponseSchema<Token[]>> {
    return this.dashboardService.wordCloudData();
  }

  chartLazyLoading: Highcharts.Options = {
    chart: {
      type: 'wordcloud',
      
      events: {
        load: () => {
          const chart = this.chartRef;
          const data = this.fetchData()
            .subscribe((data: ResponseSchema<Token[]>) => {
              let t: { name: string; weight: number; }[] = [];
              if (data.status) {
                data.data.forEach(element => {
                  t.push({ name: element.token, weight: element.count });
                });
                chart.addSeries({
                  type: 'wordcloud',
                  data: t,
                  name: 'Occurrences',
                }, false);

                chart.update({
                  navigator: {
                    series: {
                      data: t
                    }
                  }
                });
              }
            });
        }
      },
    },
  };
}
