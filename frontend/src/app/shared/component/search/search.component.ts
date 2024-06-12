import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ReservationStatus } from 'src/app/api/model/reservation.model';
import { User } from 'src/app/api/model/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) { }

  message: string = "";
  data: any;
  searchUrl = `${environment.apiUrl}/search/`;
  params = new HttpParams().set('from', this.route.snapshot.queryParams.from).set('to', this.route.snapshot.queryParams.to).set('arrival_date', this.route.snapshot.queryParams.arrival_date);
  user!: User;

  reservation = {}

  dataSource: any;
  displayedColumns: string[] = ['from', 'to', 'arrival_date', 'menu'];
  reservationUrl = `${environment.apiUrl}/reservations`;

  ngOnInit(): void {
    const parametrs = this.route.snapshot.queryParams.from;
    this.getUser();
    this.initDataSource();
  }

  getUser() {
    const userData = JSON.parse(localStorage.getItem('user')!);
    this.user = userData;
  }

  initDataSource() {
    const data = this.http.get(this.searchUrl, { params: this.params }).pipe(
      tap(console.log),
      map((response) => {
        this.dataSource = response.data,
        this.message = response.message
      })
    ).subscribe((res) => { }, (res) => {
      this.message = "Błąd pobierania danych"
    });
  }

  onSave(element: any, user: User) {

    this.reservation = {
      status: ReservationStatus.NEW,
      userId: user.id,
      routeId: element.id
    }

    if (window.confirm("Czy aby na pewno chcesz zarezerwować miejsce?")) {
      return this.http.post(`${this.reservationUrl}`, this.reservation).pipe(
        tap(console.log)
      ).subscribe((res) => {
        window.alert(this.message = "Stworzono rezerwacje")
      });
    }

    return {

    }
  }
}
