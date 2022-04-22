import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';


@Component({
    selector: 'app-widget-area',
    template: `<highcharts-chart [Highcharts]="Highcharts" [options]="chartOptions" style="width: 100%; height: 300px; display: block;"></highcharts-chart>`,
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

    chartOptions: {};
    @Input() data: number[][] = [];

    Highcharts = Highcharts;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit() {
        this.cdr.detectChanges();
        this.chartOptions = {
            chart: {
                zoomType: 'x'
            },
            title: {
                text: 'Tweets rate over time of day'
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
            },
            xAxis: {
                type: 'time'
            },
            yAxis: {
                title: {
                    text: 'Number of Tweets'
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'Tweets Rate',
                data: this.data
            }]
        };
        HC_exporting(Highcharts);

        setTimeout(() => {
            window.dispatchEvent(
                new Event('resize')
            );
        }, 300);
    }
}
