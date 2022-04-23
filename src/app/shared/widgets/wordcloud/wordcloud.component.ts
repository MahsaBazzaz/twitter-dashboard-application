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
  template: `<div id="wordcloud-container" style="width: 100%; height: 300px; display: block;"></div>`,
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent {

  Highcharts = Highcharts;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    const chart = Highcharts.chart('wordcloud-container',{
      series: [{
        type: 'wordcloud',
        data: [],
        name: 'Occurrences'
      }],
      title: {
        text: 'Wordcloud of Tweets'
      }
    });
    setInterval(() => {
      this.dashboardService.wordCloudData().subscribe(data => {
        if (data.status) {
          data.data.forEach(element => {
            if (!chart.series[0].data.find(x => x.name == element.token)) {
              let t: { name: string; weight: number; } = { name: element.token, weight: element.count };
              chart.series[0].addPoint(t);
            }
          });
        }
      });
    }, 5000);

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }
}