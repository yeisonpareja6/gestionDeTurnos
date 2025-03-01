import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // const messageService = inject(MessageService);
  const token = JSON.parse(localStorage.getItem('token')!);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      return throwError(() => { console.log('Aca va el servicio para mostrar el error');
       });
    })
  )
};
