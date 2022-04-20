import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  template: `<mat-card class="example-card">
  <mat-card-header>
      <div mat-card-avatar class="example-header-image"></div>
      <mat-card-title>{{ username }}</mat-card-title>
      <mat-card-subtitle>{{ time }}</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
      <p>{{ tweet }}</p>
  </mat-card-content>
  <mat-card-actions>
      <button mat-button><mat-icon>favorite</mat-icon>{{ likes }}</button>
      <button mat-button><mat-icon>find_replace</mat-icon>{{ retweets }}</button>
  </mat-card-actions>
</mat-card>
<br>`,
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  constructor() { }
  username: string = "mahsabzz";
  tweet: string = "hi i'm a security expert";
  likes: number = 100;
  retweets: number = 10;
  time: string = "4-19-2022";
  ngOnInit() {
  }

}
