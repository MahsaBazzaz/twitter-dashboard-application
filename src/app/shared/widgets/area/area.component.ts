import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';


@Component({
    selector: 'app-widget-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

    Highcharts = Highcharts;

    constructor(private dashboardService: DashboardService) { }

    ngOnInit() {
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
                type: 'category',
            },
            tooltip: {
                headerFormat: `<div>Time: {point.key}</div>`,
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
        setInterval(() => {
            this.dashboardService.tweetTimeSeries().subscribe(data => {
                if (data.status) {
                    for (let i = chart.series[0].data.length; i >= 0; i--) {
                        chart.series[0].data.pop();
                    }
                    for (let i = 0; i < 24; i++) {
                        let t = new Highcharts.Point();
                        t.name = `${i}`;

                        let tempData = data.data.find(x => x.hhour == i);
                        if (tempData != undefined) {
                            t.y = parseInt(`${tempData.count}`);
                        }
                        else {
                            t.y = 0;

                        }
                        chart.series[0].addPoint(t);
                    }
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
