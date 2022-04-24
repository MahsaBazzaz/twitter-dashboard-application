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
      this.dashboardService.topUsers().subscribe(data => {
        if (data.status) {
          this.users = data.data;
          console.log(data.data)
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
