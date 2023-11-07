import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthGuard {
// export class IsAuthGuard implements CanActivate, CanLoad {

//   loginSubscription = new BehaviorSubject<boolean>(false);

//   constructor(private userService: UserService, private router: Router){
//     this.userService.isAuth$().subscribe(data =>{
//       this.loginSubscription.next(data)
//     })
//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot) {
//       const userType = this.userService.getUser()?.idTipoUsuario;
//       const accessNumber = route.data?.['requiredUserType'] || 99;
//       return this.loginSubscription.getValue() && userType && userType <= accessNumber  ? true : this.router.createUrlTree(['/']);
//   }

//   canLoad(
//     route: Route,
//     segments: UrlSegment[]) {
//       const userType = this.userService.getUser()?.idTipoUsuario;
//       const accessNumber = route.data?.['requiredUserType'] || 99;
//       return this.loginSubscription.getValue() && userType && userType <= accessNumber ? true : this.router.createUrlTree(['/']);
//   }

}
