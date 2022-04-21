import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sortbar',
  templateUrl: './sortbar.component.html',
  styleUrls: ['./sortbar.component.scss']
})
export class SortbarComponent implements OnInit {
  propertyName = "";
  reverse = false;
  constructor() { }

  ngOnInit() {
  }

  sortBy(param: string) {
    if (param == "likes") {
      console.log("sort by likes")
      this.propertyName = "likes";
    }
    else if (param == "retweet") {
      console.log("sort by retweet")
      this.propertyName = "retweet";
    }
    else if (param == "date") {
      console.log("sort by date")
      this.propertyName = "date";
    }
  }
}
