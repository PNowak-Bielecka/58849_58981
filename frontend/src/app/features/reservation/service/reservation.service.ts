import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reservation } from 'src/app/api/model/reservation.model';
import { environment } from 'src/environments/environment';
import { ReservationResponse } from '../component/reservation-list/reservation-list.component';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  reservationUrl = `${environment.apiUrl}/reservations`;

  constructor(
    private http: HttpClient,
  ) { }

  getReservations(): Observable<ReservationResponse> {
    return this.http.get<ReservationResponse>(`${this.reservationUrl}`).pipe(
    )
  }

  getUserTicket(id: number): Observable<any> {
    return this.http.get<any>(`${this.reservationUrl}/tickets/${id}`).pipe(

    )
  }

  getReservation(id: string) {
    return this.http.get<any>(`${this.reservationUrl}/${id}`).pipe(

    )
  }

  editReservation(id: string, editReservation: Reservation): Observable<any> {
    return this.http.patch(`${this.reservationUrl}/${id}`, editReservation).pipe(

    )
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.reservationUrl}/${id}`).pipe(

    )
  }

  createReservation(reservation: Reservation): Observable<any> {
    return this.http.post(`${this.reservationUrl}`, reservation).pipe();
  }
}
