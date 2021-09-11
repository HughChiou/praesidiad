import { LoadingService } from './loading.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable, throwError, timer } from 'rxjs';
import {
  catchError,
  finalize,
  switchMap,
  switchMapTo,
  timeout,
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar, private loading: LoadingService) {}

  public intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.loading.show();

    const modifiedReq = req.clone({
      headers: req.headers.set('Content-Type', 'text/plain'),
    });

    return timer(1000).pipe(
      switchMapTo(
        next.handle(modifiedReq).pipe(
          timeout(5000),
          catchError((err) => {
            const { message } = err;

            this.snackBar.open(message, 'Got it!', {
              panelClass: 'custom-snackbar',
            });

            return throwError(err);
          }),
          finalize(() => {
            timer(200).subscribe(() => this.loading.hide());
          }),
        ),
      ),
    );
  }
}
