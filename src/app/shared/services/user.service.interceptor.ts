import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {UserService} from "./user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = this.auth.getToken();
    if (token){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`}
      })
    }

    return next.handle(req).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse)
            console.log('Server response')
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
              console.log('Unauthorized')
          }
        }
      )
    )
  }
}
