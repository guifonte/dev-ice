import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}
  // prettier-ignore
  intercept(req: HttpRequest<any>, next: HttpHandler) { // eslint-disable-line
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({severity:'error', summary: 'Something wrong happened', detail: error.message, life: 3000})
        return throwError(() => error);
      })
    );
  }
}
