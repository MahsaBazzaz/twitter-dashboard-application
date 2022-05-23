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

  constructor(private dashboardService: DashboardService) { }
  data = [
    ['A', 'B'],
    ['A', 'C'],
    ['A', 'D'],
    ['A', 'E'],
    ['A', 'F'],
    ['A', 'G'],

    ['B', 'C'],
    ['B', 'D'],
    ['B', 'E'],
    ['B', 'F'],
    ['B', 'G'],

    ['C', 'D'],
    ['C', 'E'],
    ['C', 'F'],
    ['C', 'G'],

    ['D', 'E'],
    ['D', 'F'],
    ['D', 'G'],

    ['E', 'F'],
    ['E', 'G'],

    ['F', 'G']
  ];
  ngOnInit() {
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
      series: [{
        layoutAlgorithm: {
          enableSimulation: true,
          initialPositions: function () {
            var chart = this.series[0].chart,
              width = chart.plotWidth,
              height = chart.plotHeight;

            this.nodes.forEach(function (node) {
              // If initial positions were set previously, use that
              // positions. Otherwise use random position:
              node.plotX = node.plotX === undefined ?
                Math.random() * width : node.plotX;
              node.plotY = node.plotY === undefined ?
                Math.random() * height : node.plotY;
            });
          }
        },
        name: 'K8',
        data: []
      }]
    } as any);

    this.update(chart);
    setInterval(() => {
      this.update(chart);
    }, 30000);
  }

  update(chart) {

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
            initialPositions: function () {
              var chart = this.series[0].chart,
                width = chart.plotWidth,
                height = chart.plotHeight;
  
              this.nodes.forEach(function (node) {
                // If initial positions were set previously, use that
                // positions. Otherwise use random position:
                node.plotX = node.plotX === undefined ?
                  Math.random() * width : node.plotX;
                node.plotY = node.plotY === undefined ?
                  Math.random() * height : node.plotY;
              });
            }
          },
          name: 'K8',
          data: newData
        });
      }
      chart.redraw();
    });
  }

}
