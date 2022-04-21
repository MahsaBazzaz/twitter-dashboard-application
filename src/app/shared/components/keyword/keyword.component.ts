import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-keyword',
  template: `<mat-card class="example-card">
            <mat-card-content>
            <button type="button" class="btn btn-sml" (click)="remove()" style="display: inline;"><mat-icon>close</mat-icon></button>
            <p style="display: inline;">{{ keyword }}</p>
            </mat-card-content>
</mat-card>
<br>`,
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {

  constructor() { }

  @Input() keyword: string = "";
  @Output() aClickedEvent = new EventEmitter<string>();

  ngOnInit() {
  }

  remove() {
    this.aClickedEvent.emit(this.keyword);
  }

}
