import { Component, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import wordcloud from 'highcharts/modules/wordcloud.js';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
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
        text: 'Wordcloud of Hashtags'
      }
    });

    this.update(chart);
    setInterval(() => {
      this.update(chart);
    }, 30000);

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

  update(chart) {
    this.emitevent(true);
    this.dashboardService.wordCloudData().subscribe(resp => {
      if (resp.ok) {

        let newData = [];

        for (const d of resp.ok.data) {
          newData.push({ name: d.token, weight: d.count });
        }

        var seriesLength = chart.series.length;
        for (var i = seriesLength - 1; i > -1; i--) {
          chart.series[i].remove();
        }

        chart.addSeries({
          type: 'wordcloud',
          data: newData,
          name: 'Occurrences'
        });
        console.log(chart.series[0].data.length)
      }
      this.emitevent(false);
      chart.redraw();
    });
  }
  emitevent(isLoading: boolean) {
    this.aClickedEvent.emit(isLoading);
  }
}