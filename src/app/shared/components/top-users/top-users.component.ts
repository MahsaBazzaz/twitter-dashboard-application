import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';
import { Hero, User } from 'src/dtos';

@Component({
  selector: 'app-top-users',
  templateUrl: './top-users.component.html',
  styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {
  users: { count: number; username: string; }[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getTopUsers();

    setInterval(() => {
      this.dashboardService.topUsers().subscribe(data => {
        if (data.status) {
          this.users = data.data;
        }

      });
    }, 5000);
  }

  getTopUsers(): void {
    this.dashboardService.topUsers()
      .subscribe(data => {
        this.users = data.data;
      });
  }
}
