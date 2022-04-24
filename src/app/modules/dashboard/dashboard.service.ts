import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {ResponseSchema, Token, TopUser, Tweet, TweetWithImage } from 'src/dtos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  tweetTimeSeries() {
    return this.http.get<ResponseSchema<{ count: number; hhour: number; }[]>>("http://127.0.0.1:3000/getTweetsTimeSeries");
  }

  wordCloudData() {
    console.log("get word cloud data from gateway");
    return this.http.get<ResponseSchema<Token[]>>("http://127.0.0.1:3000/getMostFrequestWords");
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
}
