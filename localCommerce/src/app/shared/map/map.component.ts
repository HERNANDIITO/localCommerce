import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';
import { Subscription } from 'rxjs';
import { CommerceInterface, CoordsInterface } from 'src/app/interfaces/commerce.interfaces';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
  selector: 'lc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnDestroy, OnChanges {

  map!: L.Map;
  markers!: L.Marker;

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;
  @Input() preview?: string;
  commerceSubscription?: Subscription;
  commerces: CommerceInterface[] = []; 

  constructor( private commerceService: CommerceService ) { }

  
  ngOnDestroy() {
    this.commerceSubscription?.unsubscribe();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const coords: CoordsInterface = { lat: 0, lon: 0 }
    this.commerceService.getCoords(changes["preview"].currentValue).subscribe(data => {
      if ( this.markers ) {
        this.map.removeLayer(this.markers);
      }

      coords.lat = data.results[0].lat as number;
      coords.lon = data.results[0].lon as number;   

      const icon = {
        icon: L.icon({
          iconSize: [ 22.4, 32 ],
          iconUrl: "assets/images/map-icons/default.png",
        })
      };
      this.markers = L.marker([coords.lat, coords.lon], icon).addTo(this.map);
    })   
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

    this.map = new L.Map(this.mapContainer.nativeElement, {
      maxBounds: bounds,
      minZoom: 4
    }).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom,
    );

    if (!this.preview) {
      this.commerceSubscription = this.commerceService.getCommerces().subscribe( data => {
        this.commerces = data as CommerceInterface[];
        this.commerces.forEach(commerce => {
          const icon = {
            icon: L.icon({
              iconSize: [ 22.4, 32 ],
              iconUrl: "assets/images/map-icons/" + commerce.type + ".png",
            })
          };
          this.markers = L.marker([commerce.lat, commerce.long], icon).addTo(this.map);
          const popUp = L.popup()
            .setLatLng([commerce.lat, commerce.long])
            .setContent(`<h1>${commerce.name}</h1><p>${commerce.desc}</p>`);
            
          this.markers.bindPopup(popUp).openPopup();
        });
      });
    }

    new L.TileLayer("https://maps.geoapify.com/v1/styles/klokantech-basic/style.json", { noWrap: true }).addTo(this.map);

    this.map.attributionControl
      .setPrefix("");

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: "no-token",

    }).addTo(this.map);
  }
}
