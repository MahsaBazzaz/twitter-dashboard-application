import { Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { SearchbarService } from './searchbar.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {


  constructor(private service: SearchbarService){}
 
  search(term: string): void {
    this.service.search(term);
  }

}
