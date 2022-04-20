import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() loading: boolean = false;
  @Input() httploading: boolean = false;


  constructor() { }

  ngOnChanges(changes: SimpleChange) {
    console.log(changes); 
  }

  ngOnInit() {
  }

}
