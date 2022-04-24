import { Component, ComponentFactory, ComponentFactoryResolver, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/shared/components/basicmodal/basicmodal.service';
import { SearchbarComponent } from 'src/app/shared/components/searchbar/searchbar.component';
import { SearchbarService } from 'src/app/shared/components/searchbar/searchbar.service';
import { SortbarService } from 'src/app/shared/components/sortbar/sortbar.service';
import { TweetComponent } from 'src/app/shared/components/tweet/tweet.component';
import { Tweet, TweetWithImage } from 'src/dtos';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @ViewChild("container", { read: ViewContainerRef, static: true }) tweetsContainer: ViewContainerRef;

  name = "account"
  isLoading: boolean = false;
  tweetFactory: ComponentFactory<TweetComponent>;

  constructor(private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: PostsService,
    private searchbarService: SearchbarService,
    private sortbarService: SortbarService) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.searchbarService.aClickedEvent
      .subscribe((data: string) => {
        this.service.search(data).subscribe(
          response => {
            if (response.ok) this.showTweets(response.ok.data);
          }, err => { }, () => { }
        )
      });

    this.sortbarService.aClickedEvent
      .subscribe((prm: { data: string, order: boolean }) => {
        if (prm.data == "likes") {
          console.log("likes")
          this.sortByLikes(prm.order);
        }
        else if (prm.data == "retweets") {
          console.log("retweets")
          this.sortByRetweets(prm.order);
        }
        else if (prm.data == "date") {
          console.log("date")
          this.sortByDate(prm.order);
        }
        else {
          return;
        }
      });
  }

  ngAfterViewInit() {
    this.tweetFactory = this.componentFactoryResolver.resolveComponentFactory(TweetComponent);
    this.getAllTweets();
  }

  getAllTweets() {
    this.isLoading = true;
    this.service.getAllTweets().
      subscribe(
        response => {
          if (response.ok) this.showTweets(response.ok.data);
        }, err => { }, () => { })
  }

  showTweets(data: TweetWithImage[]) {
    this.isLoading = true;
    this.tweetsContainer.clear();
    data.forEach(element => {
      const dyynamicTweet = <TweetComponent>this.tweetsContainer.createComponent(this.tweetFactory).instance;
      //TODO: user photo
      dyynamicTweet.username = element.username;
      dyynamicTweet.tweet = element.text;
      dyynamicTweet.likes = element.likes;
      dyynamicTweet.retweets = element.retweets;
      dyynamicTweet.time = element.created_at;
      dyynamicTweet.imageUrl = element.image_url
    });
    this.isLoading = false;
  }

  sortByLikes(order: boolean) {
    this.service.sortByLikes(order).subscribe(
      response => {
        if (response.ok) this.showTweets(response.ok.data);
      }, err => { }, () => { }
    )
  }

  sortByRetweets(order: boolean) {
    this.service.sortByRetweets(order).subscribe(
      response => {
        if (response.ok.data) this.showTweets(response.ok.data);
      }, err => { }, () => { }
    )
  }

  sortByDate(order: boolean) {
    this.service.sortByDate(order).subscribe(
      response => {
        if (response.ok) this.showTweets(response.ok.data);
      }, err => { }, () => { }
    )
  }


}
