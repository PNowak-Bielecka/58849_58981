import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RoutesService {

  routesUrl = `${environment.apiUrl}/routes`;

  constructor(
    private http: HttpClient
  ) { }

  getRoutes() {
    return this.http.get<any>(`${this.routesUrl}`).pipe(
      tap(console.log),
      map(routes => routes)
    )
  }

  createRoute(formValue: any) {
    return this.http.post<any>(`${this.routesUrl}`, formValue).pipe(

    )
  }

  updateRoute(routeId: any, formValue: any) {
    return this.http.patch<any>(`${this.routesUrl}/${routeId}`, formValue).pipe(

      )
  }

  deleteRoute(id: number) {
    return this.http.delete<any>(`${this.routesUrl}/${id}`).pipe(

    )
  }

}
