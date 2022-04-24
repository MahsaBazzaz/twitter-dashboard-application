import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl : './tweet.component.html',
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
