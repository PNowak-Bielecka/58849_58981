import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoutesService } from '@features/routes/service/routes.service';
import { StopsService } from '@features/stops/service/stops.service';
import { UsersService } from '@features/users/service/users.service';
import { map } from 'rxjs/operators';
import { GetStopResponse } from 'src/app/api/model/stops.model';
import { User } from 'src/app/api/model/user.model';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private breakepointObserver: BreakpointObserver,
    private routesService: RoutesService,
    private usersSerice: UsersService,
    private stopService: StopsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  addRouteForm: any;
  actionTODO = Action.NEW;
  options!: any;
  stops!: any;

  ngOnInit(): void {
    this.getStopsToForm();
    this.getUserToForm();
    this.buildForm();
    console.log(this.data.route);
    if(this.data.route.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.data.title = "Edytuj trase";
      this.patchFormData();
    }
  }

  getUserToForm() {
    return this.usersSerice.getDrivers().pipe(
      //tap(response => console.log(response)),
      map((response: User) => this.options = response)
    ).subscribe();
  }

  getStopsToForm() {
    return this.stopService.getStops().pipe(
      map((response: GetStopResponse) => this.stops = response.data)
    ).subscribe();
  }

  buildForm() {
    this.addRouteForm = this.formBuilder.group({
      arrival_date: ["", [Validators.required]],
      startId: [,[Validators.required]],
      endId: [,[Validators.required]],
      driverId: [,[Validators.required]]
    })
  }

  onSave() {

    const formValue = this.addRouteForm.value;
    let message = "";

    if(this.actionTODO === Action.NEW) {
      this.routesService.createRoute(formValue).subscribe(
        (res) => {
          this.openSnackBar("Dodano nową trasę");
        },
        (res) => {
          this.openSnackBar(`Nie udało się utworzyć trasy. ${res.error.message}`);
        }
      );
    } else {
      const routeId = this.data.route.id;
      this.routesService.updateRoute(routeId, formValue).subscribe(
        (res) => {
          this.openSnackBar("Pomyślnie zaktualizowano trasę");
        },
        (res) => {
          this.openSnackBar(`${res.error.message}`);
        }
      );
    }

  }

  isMobile = this.breakepointObserver.observe([
    Breakpoints.Handset,
    Breakpoints.Tablet,
  ]).pipe(
    map( result => result.matches )
  )

  openSnackBar(message: string, action: string = "Zamknij") {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  patchFormData(): void {
    this.addRouteForm.patchValue({
      arrival_date: this.data.route.arrival_date,
      startId: this.data.route.start.id,
      endId: this.data.route.end.id,
      driverId: this.data.route.driver.id
    })
  }
}

