import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  private baseUrl: string = "http://localhost:3000/api/"

  constructor(private _httpClient: HttpClient) { }

  getCommerces() {
    return this._httpClient.get( this.baseUrl + "getCommerces" );
  }
}
