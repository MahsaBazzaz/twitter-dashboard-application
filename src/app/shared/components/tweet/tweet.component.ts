import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  template: `<mat-card class="example-card">
  <mat-card-header>
      <img mat-card-avatar src={{imageUrl}}>
      <mat-card-title>{{ username }}</mat-card-title>
      <mat-card-subtitle>{{ time }}</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
      <p>{{ tweet }}</p>
  </mat-card-content>
  <mat-card-actions>
      <mat-icon>favorite</mat-icon>{{ likes }}
      <mat-icon>find_replace</mat-icon>{{ retweets }}
  </mat-card-actions>
</mat-card>
<br>`,
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  constructor() { }
  @Input() username: string = "mahsabzz";
  @Input() tweet: string = "hi i'm a security expert";
  @Input() likes: number = 100;
  @Input() retweets: number = 10;
  @Input() time: string = "4-19-2022";
  @Input() imageUrl: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg';
  ngOnInit() {
  }

}
