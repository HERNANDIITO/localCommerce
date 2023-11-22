import { Component } from '@angular/core';
import { ToastOpt } from 'src/app/interfaces/toast-opt.interface';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'lc-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  toastVisible = false;
  toastOpt: ToastOpt = { toastTitle: '' };
  header = '';

  constructor(private toastService: ToastService) {
    this.toastService.getObservable().subscribe(options => {
      this.closeToast();
      if(options.toastTitle !== ''){

        this.toastOpt = options;
        this.toastVisible = true;
      }
    });
  }

  closeToast(){
    this.toastVisible = false;
    this.toastOpt.callback && this.toastOpt.callback();
    this.toastOpt = { toastTitle: '' };
  }

  getIcon(type?: string){
    switch (type) {
      case 'success':
        return 'circle-check';
      case 'danger':
        return 'ban';
      case 'warning':
        return 'circle-exclamation';
      default:
        return 'bell';
    }
  }

}
