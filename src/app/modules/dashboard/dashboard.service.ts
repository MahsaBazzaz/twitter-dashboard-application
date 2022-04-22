import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResponseSchema, Token, Tweet } from 'src/dtos';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  tweetTimeSeries(): Observable<number[][]> {
    let t: number[][] = [];
    this.http.get<ResponseSchema<{ count: number; hhour: number; }[]>>("http://127.0.0.1:3000/getTweetsTimeSeries")
      .subscribe((data) => {
        if (data.status) {
          data.data.forEach(element => {
            t.push([element.hhour, element.count]);
          });
        }
      });

    // console.log("tweetTimeSeries")
    // console.log(t)

    const obsof1 = of(t);
    obsof1.subscribe(val => console.log(val),
      error => console.log("error"),
      () => console.log("complete"))
    return obsof1;
  }

  wordCloudData(): Observable<{ name: string; weight: number; }[]> {
    let t: { name: string; weight: number; }[] = [];
    this.http.get<ResponseSchema<Token[]>>("http://127.0.0.1:3000/getMostFrequestWords")
      .subscribe((data) => {
        if (data.status) {
          data.data.forEach(element => {
            t.push({ name: element.token, weight: element.count });
          });
        }
      });
    // console.log("wordCloudData")
    // console.log(t)
    const obsof1 = of(t);
    obsof1.subscribe(val => console.log(val),
      error => console.log("error"),
      () => console.log("complete"))
    return obsof1;
  }

  topUsers(): Observable<string[]> {
    let t: string[] = [];
    this.http.get<ResponseSchema<{ count: number; username: string; }[]>>("http://127.0.0.1:3000/getTopUsers")
      .subscribe((data) => {
        if (data.status) {
          data.data.forEach(element => {
            t.push(element.username);
          });
        }
      });
    // console.log("topUsers")
    // console.log(t);
    
    const obsof1 = of(t);
    obsof1.subscribe(val => console.log(val),
      error => console.log("error"),
      () => console.log("complete"))
    return obsof1;
  }

  topKeywords(): Observable<string[]> {
    let t: string[] = [];
    this.http.get<ResponseSchema<{ word: string, count: number }[]>>("http://127.0.0.1:3000/getTopKeywords")
      .subscribe((data) => {
        if (data.status) {
          data.data.forEach(element => {
            t.push(element.word);
          });
        }
      });
    // console.log("topKeywords")
    // console.log(t)
    
    const obsof1 = of(t);
    obsof1.subscribe(val => console.log(val),
      error => console.log("error"),
      () => console.log("complete"))
    return obsof1;
  }

  topTweets(): Observable<Tweet[]> {
    let t: Tweet[] = [];
    this.http.get<ResponseSchema<Tweet[]>>("http://127.0.0.1:3000/getTopKeywords")
      .subscribe((data) => {
        if (data.status) {
          data.data.forEach(element => {
            t.push(element);
          });
        }
      });
    // console.log("topTweets")
    // console.log(t)
   
    const obsof1 = of(t);
    obsof1.subscribe(val => console.log(val),
      error => console.log("error"),
      () => console.log("complete"))
    return obsof1;
  }
}
