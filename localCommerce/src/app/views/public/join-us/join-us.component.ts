import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CommerceInterface } from 'src/app/interfaces/commerce.interfaces';
import { UserInterface } from 'src/app/interfaces/user.intarfaces';
import { CommerceService } from 'src/app/services/commerce.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from 'src/app/shared/login/login.component';

@Component({
  selector: 'lc-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit, OnDestroy {
  isLoged = false;
  user!: UserInterface;
  isLogedSubscription?: Subscription;
  userSubscription?: Subscription;
  commerceSubscription?: Subscription;

  regForm = new FormGroup({
    name:     new FormControl(null, Validators.required),
    desc:     new FormControl(null, Validators.required),
    location: new FormControl(null, Validators.required),
    type:     new FormControl(null, Validators.required)
  });

  constructor( private modalService: NgbModal, private userService: UserService, private commerceService: CommerceService, private toastService: ToastService ) {}

  ngOnInit() {
    this.isLogedSubscription = this.userService.getAuthStatus().subscribe( data => {
      this.isLoged = data;
    })
    
    this.userSubscription = this.userService.getLogedUser().subscribe( data => {
      this.user = data as UserInterface;
    })
  }

  ngOnDestroy() {
    this.isLogedSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
  
  register() {
    let newCommerce: CommerceInterface;
    if ( this.regForm.value.name && this.regForm.value.desc && this.regForm.value.location ) {
      newCommerce = {
        name: this.regForm.value.name,
        desc: this.regForm.value.desc,
        location: this.regForm.value.location,
        lat: 0,
        long: 0,
        type: '',
        owner: this.user._id
      }
      console.log(newCommerce)

      this.commerceSubscription = this.commerceService.addCommerce(newCommerce).subscribe( data => {
        if (data.error) {
          this.toastService.openToast({
            toastTitle: 'Error',
            toastMsg: data.error,
            type: 'danger'
          })
        } else {
          this.toastService.openToast({
            toastTitle: 'Comercio afiliado con éxito',
            type: 'success'
          })
        }
      })
    } else {
      this.toastService.openToast({
        toastTitle: 'Error',
        toastMsg: 'faltan campos por rellenar',
        type: 'warning'
      })
    }
  }

  openLoginModal() {
    const loginModal = this.modalService.open(LoginComponent);
    loginModal.dismissed.subscribe(data => {
      console.log(this.user);
    })
  }
}
