import { Component, HostListener, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { navRoutesJSON } from './nav-bar.routes';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { RouteInterface } from 'src/app/interfaces/route.interfaces';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';
import { UserInterface } from 'src/app/interfaces/user.intarfaces';

@Component({
  selector: 'lc-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

    @ViewChildren(NgbDropdown) dropdownList!: QueryList<NgbDropdown>;
    navRoutes: Array<RouteInterface> = [];
    user?: UserInterface;
    userSubscription?: Subscription;
    actualRoute = '';
    scrolled = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.scrolled = window.scrollY > 0;
    }

    constructor(private router: Router, private modalService: NgbModal, private userService: UserService) {
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

  openLoginModal() {
    const loginModal = this.modalService.open(LoginComponent);
    loginModal.dismissed.subscribe(data => {
      console.log(this.user);
    })
  }
  
  ngOnInit(): void {
    this.navRoutes = navRoutesJSON;
    this.userSubscription = this.userService.getLogedUser().subscribe( data => {
      this.user = data;
    })
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }


}
