import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastOpt } from '../interfaces/toast-opt.interface';

const defaultOpts:ToastOpt = {
  toastTitle: '',
  toastMsg: undefined,
  delay: 6000,
  autoClose: true,
  closeButton: true,
  type: 'standard'
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastOpt$ = new BehaviorSubject<ToastOpt>({toastTitle: ''});

  constructor() { }

  openToast(options: ToastOpt) {
    this.toastOpt$.next({...defaultOpts, ...options});
  }

  getObservable() {
    return this.toastOpt$.asObservable();
  }

}
