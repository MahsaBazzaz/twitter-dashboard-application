import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.scss']
})
export class UseraccountComponent implements OnInit {

  constructor() { }
  @Input() username : string = "mahsabzz";
  @Input() detail : string = "##";
  ngOnInit() {
  }

}
