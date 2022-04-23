import { Component, ComponentFactory, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { SpinnerService } from 'src/app/shared/components/spinner/spinner.service';
import { AreaComponent } from 'src/app/shared/widgets/area/area.component';
import { WordcloudComponent } from 'src/app/shared/widgets/wordcloud/wordcloud.component';
import { Tweet } from 'src/dtos';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("wordCloud", { read: ViewContainerRef, static: true }) wordCloud: ViewContainerRef;
  @ViewChild("timeSeries", { read: ViewContainerRef, static: true }) timeSeries: ViewContainerRef;
  wordCloudFactory: ComponentFactory<WordcloudComponent>;
  timeSeriesFactory: ComponentFactory<AreaComponent>;

  topUserCol: string[] = ['name'];
  topKeywordCol: string[] = ['keyword'];
  topTweetsCol: string[] = ['tweets'];

  ishttpLoaded: boolean = false;
  isLoaded: boolean = false;

  constructor(
    private dashboardService: DashboardService,
    private spinner: SpinnerService,
    private componentFactoryResolver: ComponentFactoryResolver,) { }

  ngOnInit() {
    this.spinner.returnAsObservable().subscribe(subs => {
      this.ishttpLoaded = subs;
    });
  }
  ngAfterViewInit() {
    this.wordCloudFactory = this.componentFactoryResolver.resolveComponentFactory(WordcloudComponent);
    this.timeSeriesFactory = this.componentFactoryResolver.resolveComponentFactory(AreaComponent);
    this.showWordCloud();
    this.showTimeSeries();

    // this.dashboardService.topUsers().subscribe((data) => {
    //   let t: string[] = [];
    //   if (data.status) {
    //     data.data.forEach(element => {
    //       t.push(element.username);
    //     });
    //     //
    //   }
    // });
    // this.dashboardService.topKeywords().subscribe((data) => {
    //   let t: string[] = [];
    //   if (data.status) {
    //     data.data.forEach(element => {
    //       t.push(element.word);
    //     });
    //     //
    //   }
    // });
    // this.dashboardService.topTweets().subscribe((data) => {
    //   let t: Tweet[] = [];
    //   if (data.status) {
    //     data.data.forEach(element => {
    //       t.push(element);
    //     });
    //   }
    // });
  }

  showWordCloud() {
    this.wordCloud.clear();
    const dyynamicWordCloud = <WordcloudComponent>this.wordCloud.createComponent(this.wordCloudFactory).instance;
  }

  showTimeSeries() {
    this.timeSeries.clear();
    const dyynamicTimeSeries = <AreaComponent>this.timeSeries.createComponent(this.timeSeriesFactory).instance;
  }
}
