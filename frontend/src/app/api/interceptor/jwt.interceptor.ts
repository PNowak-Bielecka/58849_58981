import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JWT_NAME } from '@features/auth/service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(JWT_NAME);

    if(token) {
      const clonedReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
        //headers: request.headers.set('Authorization', 'Bearer' + token)
      });
      return next.handle(clonedReq);
    } else {
      return next.handle(request);
    }
  }
}
