import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { navRoutesJSON } from './nav-bar.routes';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RouteInterface } from 'src/app/interfaces/route.interfaces';

@Component({
  selector: 'lc-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  @ViewChildren(NgbDropdown) dropdownList!: QueryList<NgbDropdown>;
  navRoutes: Array<RouteInterface> = [];
  actualRoute = '';

  constructor(private router: Router) {
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
    console.log(this.actualRoute)
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
}
