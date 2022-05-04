import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';


@Component({
    selector: 'app-widget-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

    @Output() aClickedEvent = new EventEmitter<boolean>();
    Highcharts = Highcharts;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
        this.emitevent(true);
        const chart = Highcharts.chart('column-container', {
            chart: {
                type: 'column',
            },
            title: {
                text: 'Tweets per hours',
            },
            credits: {
                enabled: false,
            },
            legend: {
                enabled: false,
            },
            yAxis: {
                min: 0,
                title: undefined,
            },
            xAxis: {
                type: 'timeseries',
            },
            tooltip: {
                headerFormat: `<div>Time: {point.key}:00</div>`,
                pointFormat: `<div>{series.name}: {point.y}</div>`,
                shared: true,
                useHTML: true,
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                    },
                },
            },
            series: [{
                name: 'Amount',
                type: 'column',
                data: []
            }],
        } as any);
        this.update(chart);

        setInterval(() => {
            this.emitevent(true);
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
        this.dashboardService.tweetTimeSeries().subscribe(response => {
            if (response.ok) {
                // for (let i = chart.series[0].data.length; i >= 0; i--) {
                //     chart.series[0].data.pop();
                // }
                chart.series[0].data = [];
                chart.series[0].points = [];
                chart.series[0].xdata = [];
                chart.series[0].xData = [];
                chart.series[0].ydata = [];
                chart.series[0].yData = [];
                // response.ok.data.forEach(element => {
                //     chart.series[0].addPoint(element);
                // });



                for (let i = 0; i < 24; i++) {
                    let t = new Highcharts.Point();
                    t.name = `${i}`;

                    let tempData = response.ok.data.find(x => x.name == i);
                    if (tempData != undefined) {
                        t.y = parseInt(`${tempData.y}`);
                    }
                    else {
                        t.y = 0;
                    }
                    chart.series[0].addPoint(t);
                }
            }
            this.emitevent(false);
        });
    }
    emitevent(isLoading: boolean) {
        this.aClickedEvent.emit(isLoading);
    }
}
