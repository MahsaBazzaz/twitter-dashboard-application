import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-useraccount',
  template: `<mat-card class="example-card">
  <mat-card-header>
  <img mat-card-avatar src={{imageUrl}}>
      <mat-card-title>{{ username }}</mat-card-title>
      <button type="button" class="btn btn-sml" (click)="remove()" style="position: absolute; right: 0;"><mat-icon>close</mat-icon></button>
  </mat-card-header>
  <br>
    <!-- <mat-card-content>
        <p style="display: inline;">{{ detail }}</p>
    </mat-card-content> -->
  <mat-card-actions>
  </mat-card-actions>
</mat-card>
<br>`,
  styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent implements OnInit {

  constructor() { }

  @Input() username: string = "mahsabzz";
  @Input() detail: string = "##";
  @Input() imageUrl: string = 'https://material.angular.io/assets/img/examples/shiba2.jpg';

  @Output() aClickedEvent = new EventEmitter<string>();

  ngOnInit() {
  }

  remove() {
    this.aClickedEvent.emit(this.username);
  }
}
