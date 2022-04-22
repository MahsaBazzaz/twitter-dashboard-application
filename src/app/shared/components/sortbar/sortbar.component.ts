import { Component, OnInit } from '@angular/core';
import { SortbarService } from './sortbar.service';

@Component({
  selector: 'app-sortbar',
  templateUrl: './sortbar.component.html',
  styleUrls: ['./sortbar.component.scss']
})
export class SortbarComponent implements OnInit {
  reverse : boolean = true;
  param : string = "date";
  constructor(private service: SortbarService) { }

  ngOnInit() {
  }

  order() {
    this.reverse = (!this.reverse);
    this.sort();
  }

  sortBy(by) {
    this.param = by.value;
    this.sort();
  }
  sort(){
    // console.log(this.param);
    // console.log(this.reverse);
    this.service.sort(this.param, this.reverse);
  }
}
