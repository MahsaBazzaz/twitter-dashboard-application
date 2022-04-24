import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-useraccount',
  templateUrl : './useraccount.component.html',
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
