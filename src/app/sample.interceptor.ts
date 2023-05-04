import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable()
export class SampleInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem("token")
    let newRequest = request.clone({
      headers : request.headers.set("authentation"," Bearer" + token)
    })
    return next.handle(newRequest).pipe(
      catchError((err:HttpErrorResponse)=>{
        console.log(err)
        return of()
      })
    );
  }
}
