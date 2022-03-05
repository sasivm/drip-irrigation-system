import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  private readonly AUTHORIZATION_HEADER = 'Authorization';
  private readonly AUTHORIZATION_HEADER_PREFIX = 'Bearer ';

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._authService.getAuthTokenOnSession();
    if (!token) {
      return next.handle(req);
    }

    const clonedRequest = req.clone({
      headers: req.headers.set(this.AUTHORIZATION_HEADER, `${this.AUTHORIZATION_HEADER_PREFIX}${token}`)
    });

    return next.handle(clonedRequest);
  }
}
