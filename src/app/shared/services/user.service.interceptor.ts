import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public auth: UserService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.auth.getToken();
    let modifiedReq: HttpRequest<any> = req;

    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    const cultureParam = this.auth.getCultureParam();
    if (cultureParam) {
      modifiedReq = modifiedReq.clone({
        params: modifiedReq.params.set('culture', cultureParam)
      });
    }

    return next.handle(modifiedReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log('Server response');
          }
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401) {
              console.log('Unauthorized');
            }
          }
        }
      )
    );
  }
}
