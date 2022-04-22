import { Component, OnInit } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { Tweet } from 'src/dtos';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tweetsTimeseries = [];
  wordcloudData = [];
  topUsers: string[];
  topKeywords: string[];
  topTweets: Tweet[];
  topUserCol: string[] = ['name'];
  topKeywordCol: string[] = ['keyword'];
  topTweetsCol: string[] = ['tweets'];

  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;

  constructor(private dashboardService: DashboardService,
    private spinner: SpinnerService,) { }

  ngOnInit() {
    this.spinner.returnAsObservable().subscribe(subs => {
      this.ishttpLoaded = subs;
    });
    this.dashboardService.tweetTimeSeries().subscribe(data => {
      this.tweetsTimeseries = data
      console.log(this.tweetsTimeseries)
    });
    this.dashboardService.wordCloudData().subscribe(data => {
      this.wordcloudData = data
      console.log(this.wordcloudData)
    });
    this.dashboardService.topUsers().subscribe(data => {
      this.topUsers = data
      console.log(this.topUsers)
    });
    this.dashboardService.topKeywords().subscribe(data => {
      this.topKeywords = data
      console.log(this.topKeywords)
    });
    this.dashboardService.topTweets().subscribe(data => {
      this.topTweets = data
      console.log(this.topTweets)

    });
  }
  ngAfterViewInit() {

  }
}
