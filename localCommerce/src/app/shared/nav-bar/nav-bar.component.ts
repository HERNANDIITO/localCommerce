import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { navRoutesJSON } from './nav-bar.routes';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RouteInterface } from 'src/app/interfaces/route.interfaces';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'lc-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChildren(NgbDropdown) dropdownList!: QueryList<NgbDropdown>;
  navRoutes: Array<RouteInterface> = [];
  loginSubscription?: Subscription;
  actualRoute = '';

  loginForm = new FormGroup({
    user: new FormControl(null, Validators.required),
    pass: new FormControl(null, Validators.required),
  });

  constructor(private router: Router, private userService: UserService) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.actualRoute = (event as NavigationEnd).url;
        if (this.actualRoute.indexOf('/') === 0) {
          this.actualRoute = this.actualRoute.slice(1, this.actualRoute.length);
        }
        if (this.actualRoute.indexOf('/') > 0){
          this.actualRoute = this.actualRoute.slice(0, this.actualRoute.indexOf('/'));
        }
      });
  }
  
  ngOnInit(): void {
    this.navRoutes = navRoutesJSON;
  }

  checkSubsections(routes: RouteInterface[]) {
    return routes.find( route => route.url === this.actualRoute ) ? true : false
  }

  checkOpenDropdowns() {
    this.dropdownList.forEach( dd => {
      if ( dd.isOpen() ) {
        dd.dropdownClass = 'active';
      } else {
        dd.dropdownClass = '';
      }
    })
  }

  login() {
    let {user, pass} = this.loginForm.value;

    console.log("attempting to login...")

    if ( user && pass ) {
      this.loginSubscription = this.userService.login(user, pass).subscribe( data => {
        console.log(data)
      })
    }
  }
}
