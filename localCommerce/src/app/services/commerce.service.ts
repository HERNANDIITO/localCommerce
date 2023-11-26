import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommerceInterface } from '../interfaces/commerce.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CommerceService {

  private baseUrl: string = "http://localhost:3000/api/"

  constructor(private _httpClient: HttpClient) { }

  getCommerces() {
    return this._httpClient.get( this.baseUrl + "getCommerces" );
  }

  addCommerce(newCommerce: CommerceInterface) {
    return this._httpClient.post<any>( this.baseUrl + "addCommerce", newCommerce)
  }
}
