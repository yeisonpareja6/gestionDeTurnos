import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  toastrService = inject(ToastrService);


  showToastSuccess(title: string, message: string, duration: number = 3000) {
    this.toastrService.success(message, title, { timeOut: duration })
  }

  showToastError(title: string, message: string, duration: number = 3000) {
    this.toastrService.error(message, title, {
      timeOut: duration,
    });
  }

  showToastInfo(title: string, message: string, duration: number = 3000) {
    this.toastrService.info(message, title, {
      timeOut: duration,
    });
  }
}
