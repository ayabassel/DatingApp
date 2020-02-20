import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { error } from 'util';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: import('@angular/common/http').HttpRequest<any>,
              next: import('@angular/common/http').HttpHandler
     ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
         return next.handle(req).pipe(
            // tslint:disable-next-line: no-shadowed-variable
            catchError(error => {
               if (error.statusCode === 401) {
               return throwError(error.statusText);
               }

               if (error instanceof HttpErrorResponse) {
                   const appError = error.headers.get('Application-Error');
                   if (appError) {
                       return throwError(appError);
                   }

                   const serverError = error.error;
                   let modelStateErrors = '';
                   if (serverError.errors && typeof serverError.errors === 'object') {
                    for (const key of serverError.errors) {
                        if (serverError.errors[key]) {
                            modelStateErrors += serverError.errors[key] + '\n';
                        }
                    }

                   }
                   return throwError(modelStateErrors || serverError || 'Server Error');
               }

            })
        );
    }
}
export const ErrorInterceptorProvidor = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
