import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = "http://localhost:3000/api/"

  constructor(private _httpClient: HttpClient) { }

  getUsers() {
    return this._httpClient.get( this.baseUrl + "getUsers" );
  }

  login(user: string, pass: string) {
    return this._httpClient.post( this.baseUrl + "login", { user, pass });
  }

}
