import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { SearchbarService } from 'src/app/shared/components/searchbar/searchbar.service';
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

  name = "account"
  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;
  tweetFactory: ComponentFactory<TweetComponent>;

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: PostsService,
    private searchbarService: SearchbarService,
    private spinner: SpinnerService) {
  }

  ngOnInit() {
    this.spinner.returnAsObservable().subscribe(
      subs => {
        this.ishttpLoaded = subs;
      })

    this.searchbarService.aClickedEvent
      .subscribe((data: string) => {
        this.service.search(data).subscribe(
          response => {
            if (response.status) this.showTweets(response.data);
          }, err => { }, () => { }
        )
      });
  }

  ngAfterViewInit() {
    this.tweetFactory = this.componentFactoryResolver.resolveComponentFactory(TweetComponent);
    this.getAllTweets();
  }

  getAllTweets() {
    this.service.getAllTweets().
      subscribe(
        response => {
          if (response.status) this.showTweets(response.data);
        }, err => { }, () => { })
  }

  showTweets(data: Tweet[]) {
    this.tweetsContainer.clear();
    data.forEach(element => {
      const dyynamicTweet = <TweetComponent>this.tweetsContainer.createComponent(this.tweetFactory).instance;
      //TODO: user photo
      dyynamicTweet.username = element.username;
      dyynamicTweet.tweet = element.text;
      dyynamicTweet.likes = element.likes;
      dyynamicTweet.retweets = element.retweets;
    });
  }

}
