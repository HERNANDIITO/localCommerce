import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user.intarfaces';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from 'src/app/shared/login/login.component';

@Component({
  selector: 'lc-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit, OnDestroy {
  isLoged = false;
  user?: UserInterface;
  isLogedSubscription?: Subscription;
  userSubscription?: Subscription;

  regForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required),
  });

  constructor( private modalService: NgbModal, private userService: UserService ) {}

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
  
  register() {}

  openLoginModal() {
    const loginModal = this.modalService.open(LoginComponent);
    loginModal.dismissed.subscribe(data => {
      console.log(this.user);
    })
  }
}
