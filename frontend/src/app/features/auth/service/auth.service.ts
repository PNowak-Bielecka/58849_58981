import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LoginForm } from '../model/login.model';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../model/register.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/api/model/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

export const JWT_NAME = 'VRS_AUTH_TOKEN';

export interface LoginResponse {
  message: string;
  success: boolean;
  data: Array<any>;
}

export type Roles = 'user'| 'admin';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  private accountSubject = new BehaviorSubject<User>(null!);
  public account: Observable<User>;
  private role = new BehaviorSubject<any>(null);

  isAdmin = JSON.stringify(localStorage.getItem('role')) || null;
  authUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    this.accountSubject = new BehaviorSubject<User>(null!);
    this.account = this.accountSubject.asObservable();
  }
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get isAdmin$(): Observable<string> {
    return this.role.asObservable();
  }

  public get accountValue(): User {
    return this.accountSubject.value;
  }

  login(loginForm: LoginForm): Observable<LoginResponse> {
    return this.http.post<any>(`${this.authUrl}/login`, { email: loginForm.email, password: loginForm.password }, { withCredentials: true }).pipe(
      map((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        //console.log(res.data.user.firstName);
        localStorage.setItem(JWT_NAME, res.data.accessToken);
        localStorage.setItem('role', res.data.user.role);
        this.loggedIn.next(true);
        this.role.next(this.isAdmin);
        //console.log(res.data.user);
        return res;
      })
    );
  }
  /*login(loginForm: LoginForm) {
    return this.http.post<any>(`${this.authUrl}/login`, { email: loginForm.email, password: loginForm.password }, { withCredentials: true }).pipe(
      map((token) => {
        localStorage.setItem(JWT_NAME, token.accessToken);
        return token;
      })
    )
  }*/

  register(registerForm: RegisterForm) {
    return this.http.post<any>(`${this.authUrl}/register`, registerForm).pipe(
      map(user => user)
    )
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    const user = localStorage.getItem('user') || null;
    //const isAdmin = JSON.stringify(localStorage.getItem('role')) || null;

    const isExpired = this.jwtHelper.isTokenExpired(token!);
    if (isExpired) {
      localStorage.removeItem(JWT_NAME);
      this.accountSubject.next(null!);
      this.loggedIn.next(false);
      this.role.next(null);
    } else {
      this.loggedIn.next(true);
      //this.isAdmin);
      this.role.next(this.isAdmin);
    }
    return !this.jwtHelper.isTokenExpired(token!);
  }

  // Funkcja która wylogowuje użytkownika usuwając z pamięci lokalnej TOKEN pobrany z BACKENDU.
  logout() {
    localStorage.removeItem(JWT_NAME);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.role.next(null!);
    this.accountSubject.next(null!);
    this.loggedIn.next(false);
    this.role.next(null);
    this.router.navigate(['auth/login']);
  }
}
