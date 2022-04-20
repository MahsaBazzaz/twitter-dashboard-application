import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-keyword',
  template: `<mat-card class="example-card">
  <mat-card-content>
      <p>{{ keyword }}</p>
  </mat-card-content>
</mat-card>
<br>`,
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {

  constructor() { }
  @Input() keyword: string = "";
  ngOnInit() {
  }

}
