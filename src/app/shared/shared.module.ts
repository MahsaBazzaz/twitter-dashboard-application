import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule,MatPaginatorModule } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material'
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { WordcloudComponent } from './widgets/wordcloud/wordcloud.component';

import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';

import { BrowserModule  } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { BasicmodalComponent } from './components/basicmodal/basicmodal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { SortbarComponent } from './components/sortbar/sortbar.component';
import { TopUsersComponent } from './components/top-users/top-users.component';
import { TopKeywordsComponent } from './components/top-keywords/top-keywords.component';
import { TopTweetsComponent } from './components/top-tweets/top-tweets.component';
import { PieComponent } from './widgets/pie/pie.component';
import { MyCustomPaginatorIntlComponent } from './components/my-custom-paginator-intl/my-custom-paginator-intl.component';
import { GraphComponent } from './widgets/graph/graph.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    WordcloudComponent,
    SearchbarComponent,
    TweetComponent,
    UseraccountComponent,
    BasicmodalComponent,
    SpinnerComponent,
    KeywordComponent,
    SortbarComponent,
    TopUsersComponent,
    TopKeywordsComponent,
    TopTweetsComponent,
    PieComponent,
    MyCustomPaginatorIntlComponent,
    GraphComponent,
  ],
  entryComponents: [TweetComponent],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    WordcloudComponent,
    SearchbarComponent,
    TweetComponent,
    UseraccountComponent,
    BasicmodalComponent,
    SpinnerComponent,
    KeywordComponent,
    SortbarComponent,
    TopUsersComponent,
    PieComponent,
    MyCustomPaginatorIntlComponent,
    GraphComponent
  ],
  bootstrap: [BasicmodalComponent]
})
export class SharedModule { }
