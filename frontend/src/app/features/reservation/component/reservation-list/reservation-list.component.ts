import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservationService } from '@features/reservation/service/reservation.service';
import { pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Reservation, ReservationStatus } from 'src/app/api/model/reservation.model';
import { ReservationEditComponent } from '../reservation-edit/reservation-edit.component';

/*const RESERVATION_DATA: Reservation[] = [
  {
    reservation_id: 1,
    fromCity: "Rzeszów",
    toCity: "Przemyśl"
  },
  {
    reservation_id: 2,
    fromCity: "Przemyśl",
    toCity: "Kraków"
  }
];*/

export interface ReservationResponse {
  message: string;
  reservations: Array<Reservation>;
}



@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})


export class ReservationListComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['id', 'from', 'to', 'arrival_date', 'status', 'user.firstName', 'user.lastName','menu'];
  selectedRow: Reservation;


  newMessage: string = "";
  reservationSource: any;

  constructor(
    private dialog: MatDialog,
    private reservationService: ReservationService,
    private router: Router
  ) {

    this.selectedRow = {
      id: "",
      from: "",
      to: "",
      status: ReservationStatus.NEW,
      user: {
        firstName: '',
        lastName: '',
      }
    }


  }

  onRowClicked(row: any) {
    console.log(this.selectedRow);
    this.selectedRow = row;
  }

  ngOnInit(): void {
    //this.dataSource = new MatTableDataSource<Reservation>(RESERVATION_DATA);
    this.initDataSource();
  }

  initDataSource() {
    this.reservationService.getReservations().pipe(
      tap(console.log),
      map((res: ReservationResponse) => {
        this.newMessage = res.message
        this.dataSource = res.reservations
      })
    ).subscribe();
  }

  openModal(reservation = {}) {
    const dialogRef = this.dialog.open(ReservationEditComponent, {
      minWidth: '400px',
      minHeight: '600px',
      hasBackdrop: true,
      data: { title: 'Dodaj nową rezerwacje', reservation}
    });
  }

  onDelete(id: string) {
    if (window.confirm('Na pewno chcesz usunąc rezerwacje?')) {
      this.reservationService.deleteReservation(id).subscribe((res) => {
        this.initDataSource();
        window.alert(res.message);
      });
    }
  }

}
