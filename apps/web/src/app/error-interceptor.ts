import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export class ErrorInterceptor implements HttpInterceptor {
  // prettier-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler) { // eslint-disable-line
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        alert(error.error.message);
        return throwError(() => error);
      })
    );
  }
}