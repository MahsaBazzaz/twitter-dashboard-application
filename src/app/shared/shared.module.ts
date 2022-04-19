import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, MatListModule, MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { PieComponent } from './widgets/pie/pie.component';
import { WordcloudComponent } from './widgets/wordcloud/wordcloud.component';

import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { UseraccountComponent } from './components/useraccount/useraccount.component';

import { BrowserModule  } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';
import { BasicmodalComponent } from './components/basicmodal/basicmodal.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    PieComponent,
    WordcloudComponent,
    SearchbarComponent,
    TweetComponent,
    UseraccountComponent,
    BasicmodalComponent
  ],
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
    BrowserModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AreaComponent,
    PieComponent,
    WordcloudComponent,
    SearchbarComponent,
    TweetComponent,
    UseraccountComponent,
    BasicmodalComponent
  ],
  bootstrap: [BasicmodalComponent]
})
export class SharedModule { }
