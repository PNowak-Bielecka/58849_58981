import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../../features/reservation/service/reservation.service';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/api/model/user.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  dataSource: any;
  newMessage: string | null = "";
  displayedColumns: string[] = ['id', 'from', 'to', 'arrival_date', 'status'];
  user!: User;

  constructor(private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.getUser();
    this.initDataSource();
  }

  getUser() {
    const userData = JSON.parse(localStorage.getItem('user')!);
    this.user = userData;
  }

  initDataSource() {
    this.reservationService.getUserTicket(this.user.id!).pipe(
      tap(console.log),
      map((res) => {
        this.newMessage = res.message
        this.dataSource = res.ticket
      })
    ).subscribe();
  }
}
