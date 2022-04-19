import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { AccountsComponent } from './modules/accounts/accounts.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { KeywordsComponent } from './modules/keywords/keywords.component';
import { PostsComponent } from './modules/posts/posts.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  children: [{
    path: '',
    component: DashboardComponent
  }, {
    path: 'posts',
    component: PostsComponent
  }, {
    path: 'target_accounts',
    component: AccountsComponent
  },
  {
    path: 'keywords',
    component: KeywordsComponent
  }]
  ,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
