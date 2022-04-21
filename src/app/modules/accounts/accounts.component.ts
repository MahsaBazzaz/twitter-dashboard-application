import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SearchbarService } from 'src/app/shared/components/searchbar/searchbar.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { UseraccountComponent } from 'src/app/shared/components/useraccount/useraccount.component';
import { ResponseSchema, User } from 'src/dtos';
import { AccountsService } from './accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  name = "account"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  componentFactory: ComponentFactory<UseraccountComponent>;
  containerRef: ViewContainerRef;

  constructor(private service: AccountsService,
    private spinner: SpinnerService,
    private searchService: SearchbarService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }
  ngOnInit() {
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })

    this.searchService.aClickedEvent
      .subscribe((data: string) => {
        this.service.search(data).subscribe(
          response => {
            if (response.status) this.showUsers(response.data);
          }, err => { }, () => { }
        )
      });

  }

  ngAfterViewInit() {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(UseraccountComponent);
    this.containerRef = this.viewContainerRef;
    this.containerRef.clear();
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getAllUsers().
      subscribe(
        response => {
          if (response.status) this.showUsers(response.data);
        }, err => { }, () => { })
  }

  showUsers(data: User[]) {
    data.forEach(element => {
      this.containerRef.clear();
      const dyynamicComponent = <UseraccountComponent>this.container.createComponent(this.componentFactory).instance;
      dyynamicComponent.username = element.user_name;
    });
  }
}

