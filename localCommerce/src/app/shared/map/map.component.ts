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
  private mapContainer!: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const myAPIKey = "b127c77961fe4647a489eee79f729b9b";
    const mapStyle = "https://maps.geoapify.com/v1/styles/klokantech-basic/style.json";

    const initialState = {
      lng: 11,
      lat: 49,
      zoom: 4
    };

    const map = new L.Map(this.mapContainer.nativeElement).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    const icon = {
      icon: L.icon({
        iconSize: [ 22.4, 32 ],
        iconUrl: "assets/map-icons/default.png",
     })
    };

    L.marker([38.3964, -0.5255], icon).addTo(map);
    
    map.attributionControl
      .setPrefix("");

    L.mapboxGL({
      style: `${mapStyle}?apiKey=${myAPIKey}`,
      accessToken: "no-token"
    }).addTo(map);
  }
}
