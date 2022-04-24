import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/shared/components/basicmodal/basicmodal.service';
import { SearchbarService } from 'src/app/shared/components/searchbar/searchbar.service';
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
    private searchService: SearchbarService,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService : ModalService) { }
  ngOnInit() {
    this.searchService.aClickedEvent
      .subscribe((data: string) => {
        this.service.search(data).subscribe(
          response => {
            if (response.ok) this.showUsers(response.ok.data);
          }, err => { }, () => { }
        )
      });
    
      this.modalService.aClickedEvent
      .subscribe((data: string) => {
        this.service.add(data).subscribe(
          response => {
            if (response.ok) this.getAllUsers();
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
          if (response.ok) this.showUsers(response.ok.data);
        }, err => { }, () => { })
  }

  showUsers(data: User[]) {
    this.container.clear();
    data.forEach(element => {
      const dyynamicComponent = <UseraccountComponent>this.container.createComponent(this.componentFactory).instance;
      dyynamicComponent.username = element.username;
      dyynamicComponent.imageUrl = element.image_url;
      dyynamicComponent.aClickedEvent.subscribe((data: string) => {
        this.service.remove(data).subscribe(
          response => {
            if (response.ok) this.getAllUsers();
          }, err => { }, () => { }
        )
      });
    });
  }
}

