import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { PostsComponent } from 'src/app/modules/posts/posts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { AccountsComponent } from 'src/app/modules/accounts/accounts.component';
import { KeywordsComponent } from 'src/app/modules/keywords/keywords.component';
import { WordcloudComponent } from 'src/app/shared/widgets/wordcloud/wordcloud.component';
import { AreaComponent } from 'src/app/shared/widgets/area/area.component';
import { TopUsersComponent } from 'src/app/shared/components/top-users/top-users.component';
import { TopKeywordsComponent } from 'src/app/shared/components/top-keywords/top-keywords.component';
import { TopTweetsComponent } from 'src/app/shared/components/top-tweets/top-tweets.component';
import { PieComponent } from 'src/app/shared/widgets/pie/pie.component';
import { GraphComponent } from 'src/app/shared/widgets/graph/graph.component';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    PostsComponent,
    AccountsComponent,
    KeywordsComponent
  ],
  entryComponents: [
    WordcloudComponent,
    AreaComponent,
    TopUsersComponent,
    TopKeywordsComponent,
    TopTweetsComponent,
    PieComponent,
    GraphComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
