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

  getCoords( location: string ) {
    return this._httpClient.get<any>(`https://api.geoapify.com/v1/geocode/search?text=${location}&limit=1&type=amenity&format=json&apiKey=85201aebfd284ff5b56b7ab88f143aec`
    )
  }
}
