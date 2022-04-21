import { Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { SearchbarService } from './searchbar.service';

@Component({
  selector: 'app-searchbar',
  template: `
<input #searchBox id="search-box" (change)="search(searchBox.value)" style="width: 100% ; display: inline-block ; :focus {outline: #336699 auto 1px;}" placeholder="type to search..."/>`,
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent {


  constructor(private service: SearchbarService){}
 
  search(term: string): void {
    this.service.search(term);
  }

}
