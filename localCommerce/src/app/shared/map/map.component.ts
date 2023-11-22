import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { Subscription } from 'rxjs';
import { CommerceInterface } from 'src/app/interfaces/commerce.interfaces';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'lc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnDestroy {

  private map!: L.Map;

  @ViewChild('map')
  mapContainer!: ElementRef<HTMLElement>;
  commerceSubscription?: Subscription;
  commerces: CommerceInterface[] = []; 

  constructor( private commerceService: CommerceService ) { }

  ngOnDestroy() {
    this.commerceSubscription?.unsubscribe();
  }

  ngAfterViewInit() {
    const myAPIKey = "85201aebfd284ff5b56b7ab88f143aec";
    const mapStyle = "https://maps.geoapify.com/v1/styles/klokantech-basic/style.json";

    const southWest = L.latLng(90, 180);
    const northEast = L.latLng(-90, -180);
    const bounds = L.latLngBounds(southWest, northEast);

    const initialState = {
      lng: 20,
      lat: 45,
      zoom: 4
    };

    const map = new L.Map(this.mapContainer.nativeElement, {
      maxBounds: bounds,
      minZoom: 4
    }).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom,
    );

    this.commerceSubscription = this.commerceService.getCommerces().subscribe( data => {
      this.commerces = data as CommerceInterface[];
      this.commerces.forEach(commerce => {
        console.log(commerce);
        const icon = {
          icon: L.icon({
            iconSize: [ 22.4, 32 ],
            iconUrl: "assets/images/map-icons/" + commerce.type + ".png",
          })
        };
        const marker = L.marker([commerce.lat, commerce.long], icon).addTo(map);
        const popUp = L.popup()
          .setLatLng([commerce.lat, commerce.long])
          .setContent(`<h1>${commerce.name}</h1><p>${commerce.desc}</p>`);
          
        marker.bindPopup(popUp).openPopup();
      });
    })
    

    new L.TileLayer("https://maps.geoapify.com/v1/styles/klokantech-basic/style.json", { noWrap: true }).addTo(map);

    
    map.attributionControl
      .setPrefix("");

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: "no-token",


    }).addTo(map);
  }
}
