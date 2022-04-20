import { Component, OnInit } from '@angular/core';
import { ResponseSchema, User } from 'src/dtos';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  name = "username";
  constructor(private accountsService: AccountsService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.accountsService.getAllUsers()
      .subscribe((data: ResponseSchema<User[]>) => {
        console.log(data);
      });
  }
}
