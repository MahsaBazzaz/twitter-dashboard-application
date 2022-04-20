import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { KeywordComponent } from 'src/app/shared/components/keyword/keyword.component';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { KeywordsService } from './keywords.service';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {
  
  @ViewChild("container", { read: ViewContainerRef, static: true }) container: ViewContainerRef;


  name = "keyword"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  componentFactory: ComponentFactory<KeywordComponent>;
  containerRef: ViewContainerRef;

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: KeywordsService, private spinner: SpinnerService) {
  }

  ngOnInit() {
    console.log(this.container)
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })
  }

  ngAfterViewInit() {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(KeywordComponent);
    this.containerRef = this.viewContainerRef;
    this.containerRef.clear();
    this.getData();
  }

  getData() {
    this.container.clear();
    this.service.getAllKeywords().
      subscribe(
        response => {
          if (response.status) {
            response.data.forEach(element => {
              console.log(this.container);
              console.log(response.data)
              const dyynamicComponent = <KeywordComponent>this.container.createComponent(this.componentFactory).instance;
              dyynamicComponent.keyword = element.word;
            });
          }
        },
        err => { },
        () => { })
  }

}
