import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from 'src/app/api/model/user.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  userUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User> {
    return this.http.get<any>(`${this.userUrl}`).pipe(
      map((user: User) => user)
    )

  }

  getDrivers(): Observable<User> {
    return this.http.get<any>(`${this.userUrl}/driver`).pipe(
      map((user: User) => user)
    )

  }

  getUser(id: number): Observable<User> {
    return this.http.get<any>(`${this.userUrl}/${id}`).pipe(
      map((user: User) => user)
    )
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.userUrl}`, user).pipe(

    )
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.patch(`${this.userUrl}/${id}`, user).pipe(

    )
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.userUrl}/${id}`).pipe(

    )
  }
  }
