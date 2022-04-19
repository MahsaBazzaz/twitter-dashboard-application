import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import wordcloud from 'highcharts/modules/wordcloud.js';
wordcloud(Highcharts);

@Component({
  selector: 'app-wordcloud',
  templateUrl: './wordcloud.component.html',
  styleUrls: ['./wordcloud.component.scss']
})
export class WordcloudComponent implements OnInit {
  chartOptions: {};
  @Input() data: any = [];

  Highcharts = Highcharts;

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      accessibility: {
        screenReaderSection: {
          beforeChartFormat: '<h5>{chartTitle}</h5>'
        }
      },
      series: [{
        type: 'wordcloud',
        data: this.data,
        name: 'Occurrences'
      }],
      title: {
        text: 'Wordcloud of Tweets'
      }
    };
      HC_exporting(Highcharts);

      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
  }

}
