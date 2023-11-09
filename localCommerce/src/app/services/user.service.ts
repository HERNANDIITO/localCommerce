import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { UserInterface } from '../interfaces/user.intarfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:3000/api/"
  private authStatus$ = new BehaviorSubject<boolean>(false);
  private emptyUser = {_id: "", type: "", name:""};
  private logedUser$ = new BehaviorSubject<UserInterface>(this.emptyUser);

  constructor(private _httpClient: HttpClient) { }

  getUsers() {
    return this._httpClient.get( this.baseUrl + "getUsers" );
  }

  private saveLoginResult(isAuth: boolean, user: UserInterface){
    this.authStatus$.next(isAuth);
    this.logedUser$.next(user)
  }

  getLogedUser() {
    return this.logedUser$
  }

  getAuthStatus() {
    return this.authStatus$
  }

  logout() {
    this.authStatus$.next(false);
    this.logedUser$.next(this.emptyUser);
  }

  login(user: string, pass: string) {
    return this._httpClient.post( this.baseUrl + "login", { user, pass }).pipe(map( data => {
        if ( data ) {
          this.saveLoginResult(true, data as any as UserInterface);
          return {isAuth: true, user: this.logedUser$.value};
        }

        return false;
      }
    ));
  }

}
