import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MessagesService } from '../../shared/services/messages.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessagesService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    router.navigate(['auth']);
  }
  return next(req).pipe(
    catchError((error) => {
      return throwError(() => {
        messageService.showToastError('Error', error.err.message ?? 'Ha ocurrido un error, inténtalo mas tarde');
      });
    })
  )
};
