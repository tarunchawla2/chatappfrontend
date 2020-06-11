import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.authService.getIsAuth()) {
      return next.handle(req);
    } else {
      const modifiedRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('token'))
      })
      return next.handle(modifiedRequest);
    }
  }
}
