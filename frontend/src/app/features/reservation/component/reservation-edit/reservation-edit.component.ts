import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from '@features/reservation/service/reservation.service';
import { RoutesService } from '@features/routes/service/routes.service';
import { StopsService } from '@features/stops/service/stops.service';
import { UsersService } from '@features/users/service/users.service';
import { filter, map, tap } from 'rxjs/operators';
import { Reservation, ReservationStatus } from 'src/app/api/model/reservation.model';
import { GetStopResponse, Stop } from 'src/app/api/model/stops.model';
import { User } from 'src/app/api/model/user.model';

enum Action {
  NEW = 'new',
  EDIT = 'edit',
  //VIEW = 'view'
}

@Component({
  selector: 'app-reservation-edit',
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.scss']
})

export class ReservationEditComponent implements OnInit {

  form!: FormGroup;
  actionTODO = Action.NEW;
  options!: any;
  routes!: any;
  //options!: Array<User[]>;
  //options = this.getUsers();

  getUserToForm() {
    return this.usersService.getUsers().pipe(
      //tap(response => console.log(response)),
      map((response: User) => this.options = response)
    ).subscribe();
  }

  getRoutes() {
    return this.routesService.getRoutes().pipe(
      tap(console.log),
      map((response: any) => this.routes = response)
    ).subscribe();
  }

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService,
    private reservationService: ReservationService,
    private _snackBar: MatSnackBar,
    private routesService: RoutesService
  ) {}

  ngOnInit(): void {

    this.buildForm();
    if(this.data.reservation.hasOwnProperty('id')) {
      this.actionTODO = Action.EDIT;
      this.data.title = "Edytuj rezerwacje";
      this.pathFormData();
    }
    this.getRoutes();
    this.getUserToForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group(
      {
        routeId: [, [Validators.required]],
        status: [ReservationStatus.NEW, ],
        userId: [, [Validators.required]],
      }
    )
  }

  message = "Rezerwacja utworzona pomyślnie";

  openSnack() {
    this._snackBar.open(this.message, 'x', {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }

  onSave() {
    const formValue = this.form.value;
    if(this.actionTODO === Action.NEW) {
      this.reservationService.createReservation(formValue).subscribe(
        res => {
          res.message = this.message;
          this.openSnack();
        }
      );
    } else {
      const reservationId = this.data.reservation.id;
      this.reservationService.editReservation(reservationId, formValue).subscribe();
    }
  }

  private pathFormData(): void {
    this.form.patchValue({
      routeId: this.data.reservation.route.id,
      status: this.data.reservation.status,
      userId: Number(this.data.reservation.user.id)
    })
  }

}
