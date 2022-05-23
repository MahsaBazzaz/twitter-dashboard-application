import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { TopKeywordsComponent } from 'src/app/shared/components/top-keywords/top-keywords.component';
import { TopTweetsComponent } from 'src/app/shared/components/top-tweets/top-tweets.component';
import { TopUsersComponent } from 'src/app/shared/components/top-users/top-users.component';
import { AreaComponent } from 'src/app/shared/widgets/area/area.component';
import { GraphComponent } from 'src/app/shared/widgets/graph/graph.component';
import { PieComponent } from 'src/app/shared/widgets/pie/pie.component';
import { WordcloudComponent } from 'src/app/shared/widgets/wordcloud/wordcloud.component';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("wordCloudSibling", { read: ViewContainerRef, static: true }) wordCloud: ViewContainerRef;
  @ViewChild("timeSeriesSibling", { read: ViewContainerRef, static: true }) timeSeries: ViewContainerRef;
  @ViewChild("topUsersSibling", { read: ViewContainerRef, static: true }) topUsers: ViewContainerRef;
  @ViewChild("topKeywordsSibling", { read: ViewContainerRef, static: true }) topKeywords: ViewContainerRef;
  @ViewChild("topTweetsSibling", { read: ViewContainerRef, static: true }) topTweets: ViewContainerRef;
  @ViewChild("piechartSibling", { read: ViewContainerRef, static: true }) piechart: ViewContainerRef;
  @ViewChild("followersSibling", { read: ViewContainerRef, static: true }) followers: ViewContainerRef;
  @ViewChild("followingSibling", { read: ViewContainerRef, static: true }) following: ViewContainerRef;
  @ViewChild("graphSibling", { read: ViewContainerRef, static: true }) graph: ViewContainerRef;

  wordCloudFactory: ComponentFactory<WordcloudComponent>;
  timeSeriesFactory: ComponentFactory<AreaComponent>;
  topUsersFactory: ComponentFactory<TopUsersComponent>;
  topKeywordsFactory: ComponentFactory<TopKeywordsComponent>;
  topTweetsFactory: ComponentFactory<TopTweetsComponent>;
  piechartFactory: ComponentFactory<PieComponent>;
  graphFactory: ComponentFactory<GraphComponent>;

  wordcloudLoading: boolean = false;
  timeSeriesLoading: boolean = false;
  topUserLoading: boolean = false;
  piechartLoading: boolean = false;

  followingAvg: number;
  followersAvg: number;
  tweetAvg: number;
  yearsAvg: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private service: DashboardService) { }

  ngOnInit() {
  }
  ngAfterViewInit() {

    this.wordCloudFactory = this.componentFactoryResolver.resolveComponentFactory(WordcloudComponent);
    this.timeSeriesFactory = this.componentFactoryResolver.resolveComponentFactory(AreaComponent);
    this.topUsersFactory = this.componentFactoryResolver.resolveComponentFactory(TopUsersComponent);
    this.topKeywordsFactory = this.componentFactoryResolver.resolveComponentFactory(TopKeywordsComponent);
    this.topTweetsFactory = this.componentFactoryResolver.resolveComponentFactory(TopTweetsComponent);
    this.piechartFactory = this.componentFactoryResolver.resolveComponentFactory(PieComponent);
    this.graphFactory = this.componentFactoryResolver.resolveComponentFactory(GraphComponent);

    this.showWordCloud();
    this.showTimeSeries();
    this.showTopUsers();
    this.showTopKeywords();
    this.showTopTweets();
    this.showPiechart();
    this.updateCounts();
    // this.showGraph();

    setInterval(() => {
      this.updateCounts();
    }, 30000);


  }

  showWordCloud() {
    this.wordCloud.clear();
    const dyynamicWordCloud = <WordcloudComponent>this.wordCloud.createComponent(this.wordCloudFactory).instance;
    dyynamicWordCloud.aClickedEvent.subscribe((data: boolean) => {
      this.wordcloudLoading = data;
    });
  }

  showTimeSeries() {
    const dyynamicTimeSeries = <AreaComponent>this.timeSeries.createComponent(this.timeSeriesFactory).instance;
    dyynamicTimeSeries.aClickedEvent.subscribe((data: boolean) => {
      this.timeSeriesLoading = data;
    });
  }

  showTopUsers() {
    const dyynamictopUsers = <TopUsersComponent>this.topUsers.createComponent(this.topUsersFactory).instance;
  }

  showTopKeywords() {
    const dyynamictopKeywords = <TopKeywordsComponent>this.topKeywords.createComponent(this.topKeywordsFactory).instance;
  }

  showTopTweets() {
    const dyynamictopTweets = <TopTweetsComponent>this.topTweets.createComponent(this.topTweetsFactory).instance;
  }

  showPiechart() {
    const dyynamicpiechart = <PieComponent>this.piechart.createComponent(this.piechartFactory).instance;
    dyynamicpiechart.aClickedEvent.subscribe((data: boolean) => {
      this.piechartLoading = data;
    });
  }

  showGraph() {
    this.graph.clear();
    const dyynamicgraph = <GraphComponent>this.graph.createComponent(this.graphFactory).instance;
  }

  updateCounts() {
    this.service.followingsCount().subscribe(data => {
      if (data.ok) {
        this.followingAvg = data.ok.data;
        console.log("following : " + data.ok.data)
      }
    });
    this.service.followersCount().subscribe(data => {
      if (data.ok) {
        this.followersAvg = data.ok.data;
        console.log("followers : " + data.ok.data)
      }
    });
    this.service.tweetCount().subscribe(data => {
      if (data.ok) {
        this.tweetAvg = data.ok.data;
        console.log("tweets : " + data.ok.data)
      }
    });
    this.service.yearsCount().subscribe(data => {
      if (data.ok) {
        this.yearsAvg = data.ok.data;
        console.log("years : " + data.ok.data)
      }
    });
  }
}
