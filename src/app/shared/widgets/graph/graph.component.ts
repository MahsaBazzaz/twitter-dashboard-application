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

  constructor() { }
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
    Highcharts.chart('container', {
      chart: {
        type: 'networkgraph',
        plotBorderWidth: 1
      },
      title: {
        text: 'Networkgraph with random initial positions'
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
        data: this.data
      }]
    } as any);
  }

}
