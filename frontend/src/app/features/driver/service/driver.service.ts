import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private isEmployeeDriver = new BehaviorSubject<boolean>(false);

  get isDriver(): Observable<boolean> {
    return this.isEmployeeDriver.asObservable();
  }

  constructor() { }

  isEmployee(): boolean {

    //const employee = localStorage.getItem("user");
    const employee = JSON.parse(localStorage.getItem("user")!);

    if (employee != null) {
      const isDriver = employee.isEmployee;
      this.isEmployeeDriver.next(true);
      return true;
    } else {
      this.isEmployeeDriver.next(false);
      return false;
    }
    //console.log(employee.isEmployee);

  }


}
