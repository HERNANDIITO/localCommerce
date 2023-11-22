export interface ToastOpt {
  toastTitle: string;
  toastMsg?: string;
  delay?: number;
  autoClose?: boolean;
  closeButton?: boolean;
  type?: 'standard' | 'success' | 'danger' | 'warning';
  callback?: CallableFunction;
}
