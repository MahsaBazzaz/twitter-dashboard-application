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
                let newData = [];

                for (let i = 0; i < 24; i++) {
                    let tempData = response.ok.data.find(x => x.name == i);
                    if (tempData != undefined) {
                        newData.push({ name: `${i}`, y: parseInt(`${tempData.y}`) });
                    }
                    else {
                        newData.push({ name: `${i}`, y: 0 });
                    }

                }

                var seriesLength = chart.series.length;
                var navigator;
                for (var i = seriesLength - 1; i > -1; i--) {
                    if (chart.series[i].name.toLowerCase() == 'navigator') {
                        navigator = chart.series[i];
                    } else {
                        chart.series[i].remove();
                    }
                }

                chart.addSeries({
                    name: 'Amount',
                    type: 'column',
                    data: newData
                });
                console.log(chart.series[0].data.length)
            }
            chart.redraw();
            this.emitevent(false);
        });
    }
    emitevent(isLoading: boolean) {
        this.aClickedEvent.emit(isLoading);
    }
}
