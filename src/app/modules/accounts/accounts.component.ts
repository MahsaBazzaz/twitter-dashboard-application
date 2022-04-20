import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { ResponseSchema, User } from 'src/dtos';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  @ViewChild("container", { static: false }) container: ElementRef;
  name = "account"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  constructor(private accountsService: AccountsService, private spinner: SpinnerService) { }
  ngOnInit() {
    console.log(this.container)
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })
  }

  ngAfterViewInit() {
    // this.getData();
  }

  getData() {
    this.accountsService.getAllUsers().
      subscribe(
        response => {
          if (response.status) {
            response.data.forEach(element => {
              this.container.nativeElement.innerHTML += `<app-useraccount [username]="${element.user_name}", [detail]=""></app-useraccount>`;
            });
          }
        },
        err => { },
        () => { })
  }
}

