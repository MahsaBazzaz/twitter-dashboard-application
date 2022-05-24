import { Component, EventEmitter, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorService } from './paginator.service';

@Component({
  selector: 'app-my-custom-paginator-intl',
  templateUrl: './my-custom-paginator-intl.component.html',
  styleUrls: ['./my-custom-paginator-intl.component.scss']
})
export class MyCustomPaginatorIntlComponent {

  length = 500;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  showFirstLastButtons = false;

  constructor(private service: PaginatorService) { }
  ngAfterViewInit() {

    this.getTweetCount();
    setInterval(() => {
      this.getTweetCount();
    }, 30000);
  }
  handlePageEvent(event: PageEvent) {
    this.getTweetCount();
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.service.emit(this.pageIndex, this.pageSize)
  }

  getTweetCount() {
    this.service.getTweetCount().subscribe(res => {
      if (res.ok) {
        this.length = Math.ceil(res.ok.data / this.pageSize)
      }
    });
  }

}
