import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent implements OnInit {

  constructor() { }
  username : string = "mahsabzz";
  tweet : string = "hi i'm a security expert";
  likes : number = 100;
  retweets : number = 10;
  time : string = "4-19-2022";
  ngOnInit() {
  }

}
