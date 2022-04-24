import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';

@Component({
  selector: 'app-top-keywords',
  templateUrl: './top-keywords.component.html',
  styleUrls: ['./top-keywords.component.scss']
})
export class TopKeywordsComponent implements OnInit {
  keywords: { word: string, count: number }[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getTopKeywords();

    setInterval(() => {
      this.getTopKeywords();
    }, 5000);
  }

  getTopKeywords(): void {
    this.dashboardService.topKeywords()
      .subscribe(data => {
        this.keywords = data.data;
      });
  }

}
