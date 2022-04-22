import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  tweetTimeSeries(): number[][] {
    let t = [[1, 2], [3, 4]];
    return t;
  }

  wordCloudData(): { name: string; weight: number; }[] {
    let t = [{ name: "mahsa", weight: 2 }];
    return t;
  }

  topUsers(): string[] {
    let t = ["mahsa"];
    return t;
  }

  topKeywords(): string[] {
    let t = ["mahsa"];
    return t;
  }

  topTweets(): string[] {
    let t = ["mahsa"];
    return t;
  }

  // cards() {
  //   return [71, 78, 39, 66];
  // }
}
