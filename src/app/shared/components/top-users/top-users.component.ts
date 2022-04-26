import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { TopUser } from 'src/dtos';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {
  users: TopUser[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getTopUsers();

    setInterval(() => {
      this.getTopUsers();
    }, 30000);
  }

  getTopUsers(): void {
    this.dashboardService.topUsers()
      .subscribe(resp => {
        if(resp.ok){
          this.users = resp.ok.data.slice(0,3);
        }
      });
  }
}
