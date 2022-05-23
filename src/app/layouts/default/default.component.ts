import { Component, OnInit,NgZone } from '@angular/core';
import { DashboardService } from 'src/app/modules/dashboard/dashboard.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit() {}



  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }



}
