import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { Tweet, TweetWithImage } from 'src/dtos';

@Component({
  selector: 'app-top-tweets',
  templateUrl: './top-tweets.component.html',
  styleUrls: ['./top-tweets.component.scss']
})
export class TopTweetsComponent implements OnInit {

  tweets: TweetWithImage[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getTopTweets();

    setInterval(() => {
      this.getTopTweets();
    }, 5000);
  }

  getTopTweets(): void {
    this.dashboardService.topTweets()
      .subscribe(data => {
        this.tweets = data.data;
      });
  }

}
