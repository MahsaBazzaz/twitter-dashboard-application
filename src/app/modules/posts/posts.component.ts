import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { TweetComponent } from 'src/app/shared/components/tweet/tweet.component';
import { Tweet } from 'src/dtos';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef, static: true }) tweetsContainer: ViewContainerRef;
  @ViewChild("searchbarContainer", { read: ViewContainerRef, static: true }) searchbarContainer: ViewContainerRef;

  name = "account"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  tweetFactory: ComponentFactory<TweetComponent>;
  searchbarFactory: ComponentFactory<SearchbarComponent>;

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: PostsService, private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })
  }

  ngAfterViewInit() {
    this.tweetFactory = this.componentFactoryResolver.resolveComponentFactory(TweetComponent);
    this.searchbarFactory = this.componentFactoryResolver.resolveComponentFactory(SearchbarComponent);
    console.log(this.tweetsContainer)
    console.log(this.searchbarContainer)
    this.searchbarContainer.clear();
    const dynamicSearch = <SearchbarComponent>this.searchbarContainer.createComponent(this.searchbarFactory).instance;
    dynamicSearch.container = this.tweetsContainer;
    this.getData();
  }

  getData() {
    this.tweetsContainer.clear();
    this.service.getAllTweets().
      subscribe(
        response => {
          if (response.status) {
            response.data.forEach(element => {
              const dyynamicTweet = <TweetComponent>this.tweetsContainer.createComponent(this.tweetFactory).instance;
              //TODO: user photo
              dyynamicTweet.username = element.username;
              dyynamicTweet.tweet = element.text;
              dyynamicTweet.likes = element.likes;
              dyynamicTweet.retweets = element.retweets;
            });
          }
        },
        err => {

        },
        () => { })
  }

}
