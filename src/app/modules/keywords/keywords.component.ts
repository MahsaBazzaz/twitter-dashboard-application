import { Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { KeywordComponent } from 'src/app/shared/components/keyword/keyword.component';
import { SearchbarService } from 'src/app/shared/components/searchbar/searchbar.service';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { keyword } from 'src/dtos';
import { KeywordsService } from './keywords.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef, static: true }) container: ViewContainerRef;
  @Output() e = new EventEmitter<keyword[]>();

  name = "keyword"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  componentFactory: ComponentFactory<KeywordComponent>;
  containerRef: ViewContainerRef;

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: KeywordsService,
    private spinner: SpinnerService,
    private searchService: SearchbarService) {
  }

  ngOnInit() {
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })

    this.searchService.aClickedEvent
      .subscribe((data: string) => {
        this.service.search(data).subscribe(
          response => {
            if (response.status) this.showKeywords(response.data);
          }, err => { }, () => { }
        )
      });
  }

  ngAfterViewInit() {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(KeywordComponent);
    this.containerRef = this.viewContainerRef;
    this.containerRef.clear();
    this.getAllKeywords();
  }

  getAllKeywords() {
    this.service.getAllKeywords().
      subscribe(
        response => {
          if (response.status) this.showKeywords(response.data);
        }, err => { }, () => { })
  }

  showKeywords(data: keyword[]) {
    this.container.clear();
    data.forEach(element => {
      const dyynamicComponent = <KeywordComponent>this.container.createComponent(this.componentFactory).instance;
      dyynamicComponent.keyword = element.word;
    });
  }

}
