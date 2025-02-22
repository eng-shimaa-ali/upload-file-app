import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { delay, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      delay(1000), // Simulate network delay
      mergeMap((event) => {
        if (Math.random() < 0.3) {
          // 30% chance to fail request
          return throwError(
            () =>
              new HttpErrorResponse({
                status: 500,
                statusText: 'Simulated Upload Failure',
              })
          );
        }
        return new Observable<HttpEvent<any>>((observer) => {
          observer.next(event);
          observer.complete();
        });
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Upload failed:', error);
        return throwError(() => error);
      })
    );
  }
}
