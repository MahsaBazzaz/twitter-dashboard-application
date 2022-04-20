import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatCardModule } from '@angular/material';
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
  componentFactory: ComponentFactory<MatCardModule>;
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
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(MatCardModule);
    this.containerRef = this.viewContainerRef;
    this.containerRef.clear();
    this.getData();
  }

  getData() {
    this.container.clear();
    this.service.getAllUsers().
      subscribe(
        response => {
          if (response.status) {
            response.data.forEach(element => {
              console.log(this.container);
              console.log(response.data)
              const dyynamicComponent = <MatCardModule>this.container.createComponent(this.componentFactory).instance;
              
            });
          }
        },
        err => { },
        () => { })
  }

}
