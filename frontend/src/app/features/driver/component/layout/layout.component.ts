import { Component, OnInit } from '@angular/core';
import { DriverService } from '@features/driver/service/driver.service';
import { User } from 'src/app/api/model/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(driverService: DriverService) { }

  ngOnInit(): void {

  }

}
