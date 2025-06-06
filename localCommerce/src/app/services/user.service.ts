import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { RegisterUserInterface, UserInterface } from '../interfaces/user.intarfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = "http://localhost:3000/api/"
  private authStatus$ = new BehaviorSubject<boolean>(false);

  private emptyUser: UserInterface = {
    _id: "",
    type: "",
    name: "",
    user: ''
  };
  
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
    return this.logedUser$.asObservable();
  }

  getAuthStatus() {
    return this.authStatus$.asObservable();
  }

  register(user: RegisterUserInterface) {
    return this._httpClient.post<any>( this.baseUrl + "register", user)
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
