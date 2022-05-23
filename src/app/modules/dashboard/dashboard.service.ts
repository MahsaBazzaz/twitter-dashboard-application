import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { graphDto, ResponseSchema, Token, TopUser, Tweet, TweetWithImage } from 'src/dtos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  tweetTimeSeries() {
    return this.http.get<ResponseSchema<{ y: number; name: number; }[]>>("http://127.0.0.1:3000/getTweetsTimeSeries");
  }

  wordCloudData() {
    return this.http.get<ResponseSchema<Token[]>>("http://127.0.0.1:3000/getMostFrequestWords");
  }

  piechartData() {
    return this.http.get<ResponseSchema<{ name: string, y: number }[]>>("http://127.0.0.1:3000/getVerificationStatus");
  }

  topUsers() {
    return this.http.get<ResponseSchema<TopUser[]>>("http://127.0.0.1:3000/getTopUsers");
  }

  topKeywords() {
    return this.http.get<ResponseSchema<{ word: string, count: number }[]>>("http://127.0.0.1:3000/getTopKeywords");
  }

  topTweets() {
    return this.http.get<ResponseSchema<TweetWithImage[]>>("http://127.0.0.1:3000/getTopTweets");
  }

  followingsCount() {
    return this.http.get<ResponseSchema<number>>("http://127.0.0.1:3000/FollowingsCount");
  }

  followersCount() {
    return this.http.get<ResponseSchema<number>>("http://127.0.0.1:3000/FollowersCount");
  }

  tweetCount() {
    return this.http.get<ResponseSchema<number>>("http://127.0.0.1:3000/tweetsCount");
  }

  yearsCount() {
    return this.http.get<ResponseSchema<number>>("http://127.0.0.1:3000/yearsCount");
  }

  graphData() {
    return this.http.get<ResponseSchema<graphDto[]>>("http://127.0.0.1:3000/graphData");
  }
}
