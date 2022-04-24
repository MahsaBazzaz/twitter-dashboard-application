import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TopKeywordsComponent } from 'src/app/shared/components/top-keywords/top-keywords.component';
import { TopTweetsComponent } from 'src/app/shared/components/top-tweets/top-tweets.component';
import { TopUsersComponent } from 'src/app/shared/components/top-users/top-users.component';
import { AreaComponent } from 'src/app/shared/widgets/area/area.component';
import { WordcloudComponent } from 'src/app/shared/widgets/wordcloud/wordcloud.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // @ViewChild("wordCloud", { read: ViewContainerRef, static: true }) wordCloudParent: ViewContainerRef;
  @ViewChild("wordCloudSibling", { read: ViewContainerRef, static: true }) wordCloud: ViewContainerRef;

  // @ViewChild("timeSeries", { read: ViewContainerRef, static: true }) timeSeriesParent: ViewContainerRef;
  @ViewChild("timeSeriesSibling", { read: ViewContainerRef, static: true }) timeSeries: ViewContainerRef;

  // @ViewChild("topUsers", { read: ViewContainerRef, static: true }) topUsersParent: ViewContainerRef;
  @ViewChild("topUsersSibling", { read: ViewContainerRef, static: true }) topUsers: ViewContainerRef;

  // @ViewChild("topKeywords", { read: ViewContainerRef, static: true }) topKeywordsParent: ViewContainerRef;
  @ViewChild("topKeywordsSibling", { read: ViewContainerRef, static: true }) topKeywords: ViewContainerRef;

  // @ViewChild("topTweets", { read: ViewContainerRef, static: true }) topTweetsParent: ViewContainerRef;
  @ViewChild("topTweetsSibling", { read: ViewContainerRef, static: true }) topTweets: ViewContainerRef;

  wordCloudFactory: ComponentFactory<WordcloudComponent>;
  timeSeriesFactory: ComponentFactory<AreaComponent>;
  topUsersFactory: ComponentFactory<TopUsersComponent>;
  topKeywordsFactory: ComponentFactory<TopKeywordsComponent>;
  topTweetsFactory: ComponentFactory<TopTweetsComponent>;

  wordcloudLoading : boolean = false;
  timeSeriesLoading : boolean = false;
  topUserLoading : boolean = false;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,) { }

  ngOnInit() {
  }
  ngAfterViewInit() {

    this.wordCloudFactory = this.componentFactoryResolver.resolveComponentFactory(WordcloudComponent);
    this.timeSeriesFactory = this.componentFactoryResolver.resolveComponentFactory(AreaComponent);
    this.topUsersFactory = this.componentFactoryResolver.resolveComponentFactory(TopUsersComponent);
    this.topKeywordsFactory = this.componentFactoryResolver.resolveComponentFactory(TopKeywordsComponent);
    this.topTweetsFactory = this.componentFactoryResolver.resolveComponentFactory(TopTweetsComponent);

    this.showWordCloud();
    this.showTimeSeries();
    this.showTopUsers();
    this.showTopKeywords();
    this.showTopTweets();
  }

  showWordCloud() {
    this.wordCloud.clear();
    const dyynamicWordCloud = <WordcloudComponent>this.wordCloud.createComponent(this.wordCloudFactory).instance;
    dyynamicWordCloud.aClickedEvent.subscribe((data : boolean) => {
      this.wordcloudLoading = data;
    });
  }

  showTimeSeries() {
    const dyynamicTimeSeries = <AreaComponent>this.timeSeries.createComponent(this.timeSeriesFactory).instance;
  }

  showTopUsers() {
    const dyynamicTimeSeries = <TopUsersComponent>this.topUsers.createComponent(this.topUsersFactory).instance;
  }

  showTopKeywords() {
    const dyynamicTimeSeries = <TopKeywordsComponent>this.topKeywords.createComponent(this.topKeywordsFactory).instance;
  }

  showTopTweets() {
    const dyynamicTimeSeries = <TopTweetsComponent>this.topTweets.createComponent(this.topTweetsFactory).instance;
  }
}
