import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import  * as L from 'leaflet';
import 'mapbox-gl-leaflet';

@Component({
  selector: 'lc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  private map!: L.Map;

  @ViewChild('map')
  mapContainer!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
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

    const icon = {
      icon: L.icon({
        iconSize: [ 22.4, 32 ],
        iconUrl: "assets/map-icons/default.png",
     })
    };

    const layer = new L.TileLayer("https://maps.geoapify.com/v1/styles/klokantech-basic/style.json", { noWrap: true }).addTo(map);

    L.marker([38.3964, -0.5255], icon).addTo(map);
    
    map.attributionControl
      .setPrefix("");

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: "no-token",


    }).addTo(map);
  }
}
