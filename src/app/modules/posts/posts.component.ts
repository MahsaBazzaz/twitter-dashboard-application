import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { TweetComponent } from 'src/app/shared/components/tweet/tweet.component';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef, static: true }) container: ViewContainerRef;


  name = "account"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  componentFactory: ComponentFactory<TweetComponent>;
  containerRef: ViewContainerRef;

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private accountsService: PostsService, private spinner: SpinnerService) {
  }

  ngOnInit() {
    console.log(this.container)
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })
  }

  ngAfterViewInit() {
    this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(TweetComponent);
    this.containerRef = this.viewContainerRef;
    this.containerRef.clear();
    this.getData();
  }

  getData() {
    this.container.clear();
    this.accountsService.getAllUsers().
      subscribe(
        response => {
          if (response.status) {
            response.data.forEach(element => {
              console.log(this.container);
              console.log(response.data)
              const dyynamicComponent = <TweetComponent>this.container.createComponent(this.componentFactory).instance;
              //TODO: user photo
              dyynamicComponent.username = element.username;
              dyynamicComponent.tweet = element.text;
              dyynamicComponent.likes = element.likes;
              dyynamicComponent.retweets = element.retweets;
            });
          }
        },
        err => { },
        () => { })
  }

}
