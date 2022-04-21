import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-useraccount',
  template: `<mat-card class="example-card">
  <mat-card-header>
      <mat-icon mat-card-avatar class="example-header-image"></mat-icon>
      <mat-card-subtitle>{{ username }}</mat-card-subtitle>
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
  @Output() aClickedEvent = new EventEmitter<string>();

  ngOnInit() {
  }

  remove() {
    this.aClickedEvent.emit(this.username);
  }
}
