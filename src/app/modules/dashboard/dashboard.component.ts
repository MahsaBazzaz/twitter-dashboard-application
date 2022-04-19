import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tweetsTimeseries = [];
  wordcloudData = [];
  cards = [];
  pieChart = [];
  topUsers : string[];
  topKeywords : string[];
  topTweets : string[];
  topUserCol: string[] = ['name'];
  topKeywordCol: string[] = ['keyword'];
  topTweetsCol: string[] = ['tweets'];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.tweetsTimeseries = this.dashboardService.tweetTimeSeries();
    this.wordcloudData = this.dashboardService.wordCloudData();
    this.cards = this.dashboardService.cards();
    this.pieChart = this.dashboardService.pieChart();
    this.topUsers = this.dashboardService.topUsers();
    this.topKeywords = this.dashboardService.topKeywords();
    this.topTweets = this.dashboardService.topTweets();
  }

}
