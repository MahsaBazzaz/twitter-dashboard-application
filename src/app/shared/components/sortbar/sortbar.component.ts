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
    this.sortBy(this.param);
  }

  sortBy(param) {
    this.param = param;
    this.service.sort(param.value, this.reverse);
  }
}
