import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RegisterUserInterface, UserInterface } from 'src/app/interfaces/user.intarfaces';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'lc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy, OnInit {

  loginSubscription?: Subscription;
  userSubscription?: Subscription;
  authSubscription?: Subscription;
  user?: UserInterface;
  wantRegister = false;
  isLoged = false;
  isCollapsed = true;

  loginForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required),
  });

  regForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required),
  });
  
  constructor(private userService: UserService, private toastService: ToastService, private router: Router,private modalService: NgbModal ) {
    
  }

  logout() {
    this.userService.logout();
    this.isLoged = false;
    this.user = undefined;
  }

  login() {
    let {user, pass} = this.loginForm.value;

    if ( user && pass ) {
      this.loginSubscription = this.userService.login(user, pass).subscribe( data => {
        if (data) {
          this.toastService.openToast({
            toastTitle: 'Sesión iniciada con éxito',
            type: 'success'
          })
          this.isLoged = data.isAuth;
          this.user = data.user;

          this.userSubscription = this.userService.getLogedUser().subscribe(data => {
            this.user = data;
          });

          this.authSubscription = this.userService.getAuthStatus().subscribe( data => {
            this.isLoged = data;
          })
        } else {
          this.toastService.openToast({
            toastTitle: 'Error',
            toastMsg: "Usuario o contraseña incorrecto",
            type: 'danger'
          })
        }
      })
    }
  }

  register() {

    let error = false;

    const nameValue = this.regForm.value.name;
    const userValue = this.regForm.value.user;
    const passValue = this.regForm.value.pass;

    if ( !(nameValue && userValue && passValue) ) {
      return
    }

    const user: RegisterUserInterface = {
      name: nameValue,
      user: userValue,
      pass: passValue
    }

    this.loginSubscription = this.userService.register(user).subscribe( data => {
      if(data.error) {
        error = true;
        this.toastService.openToast({
          toastTitle: 'Error',
          toastMsg: data.error,
          type: 'danger'
        })
      } else {
        this.userService.login(user.user, user.pass).subscribe( data => {
          if (data) {
            this.toastService.openToast({
              toastTitle: 'Usuario registrado con éxito',
              type: 'success'
            })
            this.isLoged = data.isAuth;
            this.user = data.user;
    
            this.userSubscription = this.userService.getLogedUser().subscribe(data => {
              this.user = data;
            });
    
            this.authSubscription = this.userService.getAuthStatus().subscribe( data => {
              this.isLoged = data;
            })
          }
        })
      }
    })
  }

  goTo( url: string ) {
    this.router.navigateByUrl(url)
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    this.userSubscription = this.userService.getLogedUser().subscribe(data => {
      this.user = data;
    });

    this.authSubscription = this.userService.getAuthStatus().subscribe( data => {
      this.isLoged = data;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.authSubscription?.unsubscribe();
  }

}
