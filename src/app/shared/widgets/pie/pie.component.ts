import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { ResponseSchema } from 'src/dtos';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  @Output() aClickedEvent = new EventEmitter<boolean>();
  Highcharts = Highcharts;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.emitevent(true);
    const chart = Highcharts.chart('piechart-container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Accounts Verificiation Status'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Accounts',
        colorByPoint: true,
        data: []
      }]
    } as any);

    this.update(chart);
    // setInterval(() => {
    //   this.update(chart);
    // }, 30000);

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);

  }

  update(chart) {
    this.emitevent(true);
    this.dashboardService.piechartData().subscribe((resp: ResponseSchema<{ name: string; y: number; }[]>) => {
      if (resp.ok) {
        // chart.series[0].data = resp.ok.data;
      // chart.series[0].setData(newValue, true);

        for (let i = chart.series[0].data.length; i >= 0; i--) {
          chart.series[0].data.pop();
        }
        for (const d of resp.ok.data) {
          chart.series[0].addPoint({ name: d.name, y: d.y });
        }
      }

      this.emitevent(false);
    });
  }
  emitevent(isLoading: boolean) {
    this.aClickedEvent.emit(isLoading);
  }

}
