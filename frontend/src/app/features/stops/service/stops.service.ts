import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetStopResponse, Stop } from 'src/app/api/model/stops.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StopsService {

  stopUrl = `${environment.apiUrl}/stops`;

  constructor(
    private http: HttpClient
  ) { }

  getStops() {
    return this.http.get<GetStopResponse>(`${this.stopUrl}`);
  }

  createStop(stop: Stop): Observable<Stop> {
    return this.http.post<Stop>(`${this.stopUrl}`, stop).pipe(
  )}

  updateStop(id: number, stop: Stop) {
    return this.http.patch(`${this.stopUrl}/${id}`, stop).pipe(
  )}

  deleteStop(id: number) {
    return this.http.delete<any>(`${this.stopUrl}/${id}`).pipe(

  )}

}
