import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import wordcloud from 'highcharts/modules/wordcloud.js';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { ResponseSchema, Token } from 'src/dtos';
wordcloud(Highcharts);

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})


export class WordcloudComponent {
  
  @Output() aClickedEvent = new EventEmitter<boolean>();
  Highcharts = Highcharts;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.emitevent(true);
    const chart = Highcharts.chart('wordcloud-container', {
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
      this.emitevent(true);
      this.dashboardService.wordCloudData().subscribe(resp => {
        if (resp.ok) {
          resp.ok.data.forEach(element => {
            if (!chart.series[0].data.find(x => x.name == element.token)) {
              let t: { name: string; weight: number; } = { name: element.token, weight: element.count };
              chart.series[0].addPoint(t);
            }
          });
        }
        this.emitevent(false);
      });
    }, 5000);

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

  emitevent(isLoading : boolean) {
    this.aClickedEvent.emit(isLoading);
  }
}