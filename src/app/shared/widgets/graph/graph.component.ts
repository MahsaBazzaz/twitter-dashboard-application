import { Component, OnInit, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts';
// import indicators from 'highcharts/indicators/indicators';
import network from 'highcharts/modules/networkgraph';
// indicators(Highcharts);
network(Highcharts);

import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @Output() aClickedEvent = new EventEmitter<boolean>();
  constructor(private dashboardService: DashboardService) { }
  ngOnInit() {
    this.emitevent(true);
    const chart = Highcharts.chart('container', {
      chart: {
        type: 'networkgraph',
        plotBorderWidth: 1
      },
      title: {
        text: 'The Graph Of Retweets'
      },
      plotOptions: {
        networkgraph: {
          keys: ['from', 'to']
        }
      },
      series: [
      //   {
      //   layoutAlgorithm: {
      //     enableSimulation: true,
      //     initialPositions: function () {
      //       var chart = this.series[0].chart,
      //         width = chart.plotWidth,
      //         height = chart.plotHeight;

      //       this.nodes.forEach(function (node) {
      //         // If initial positions were set previously, use that
      //         // positions. Otherwise use random position:
      //         node.plotX = node.plotX === undefined ?
      //           Math.random() * width : node.plotX;
      //         node.plotY = node.plotY === undefined ?
      //           Math.random() * height : node.plotY;
      //       });
      //     }
      //   },
      //   name: 'K8',
      //   data: []
      // }
    ]
    } as any);

    this.update(chart);
    setInterval(() => {
      this.update(chart);
    }, 30000);
  }

  update(chart) {
    this.emitevent(true);
    this.dashboardService.graphData().subscribe(resp => {
      if (resp.ok) {
        let newData = [];

        for (let i = 0; i < resp.ok.data.length; i++) {
          newData.push([resp.ok.data[i].user_name, resp.ok.data[i].owner_name]);
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
          layoutAlgorithm: {
            enableSimulation: true,
            // initialPositions: function () {
            //   var chart = this.series[0].chart,
            //     width = chart.plotWidth,
            //     height = chart.plotHeight;
  
            //   this.nodes.forEach(function (node) {
            //     // If initial positions were set previously, use that
            //     // positions. Otherwise use random position:
            //     node.plotX = node.plotX === undefined ?
            //       Math.random() * width : node.plotX;
            //     node.plotY = node.plotY === undefined ?
            //       Math.random() * height : node.plotY;
            //   });
            // }
          },
          name: 'K8',
          data: newData
        });
      }
      this.emitevent(false);
      chart.redraw();
    });
  }

  emitevent(isLoading: boolean) {
    this.aClickedEvent.emit(isLoading);
  }

}
