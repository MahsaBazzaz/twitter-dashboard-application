import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResponseSchema, User } from 'src/dtos';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  // template: `<div #container></div>`,
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  // @ViewChild("tref", {read: ElementRef}) tref: ElementRef;
  name = "username";
  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    // this.getAllUsers();
  }

  getAllUsers() {
    this.accountsService.getAllUsers()
      .subscribe((data: ResponseSchema<User[]>) => {
        console.log(data);
        // <app-useraccount [username]="" [detail]=""></app-useraccount>
      });
  }
}
