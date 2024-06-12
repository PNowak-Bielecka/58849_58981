import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  vrs = {
    title: 'Vehicle Reservation System'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
