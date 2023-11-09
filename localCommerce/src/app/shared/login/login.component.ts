import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.intarfaces';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'lc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginSubscription?: Subscription;
  userSubscription?: Subscription;
  user?: UserInterface;
  isLoged = false;
  isCollapsed = true;

  loginForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required),
  });
  
  constructor(private userService: UserService) {}

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
          this.isLoged = data.isAuth;
          this.user = data.user;
          console.log(this.user)
          this.userSubscription = this.userService.getLogedUser().subscribe();
        }
      })
    }
  }

  goTo( url: string ) {
    
  }

}
