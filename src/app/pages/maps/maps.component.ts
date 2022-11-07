import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as GemeindenJson from "../../../assets/shapedata/Einheitsgemeinden.json";
import * as shp2 from "../../../assets/shapedata/Shapefile2.json";
import * as shp3 from "../../../assets/shapedata/Shapefile3.json";
import * as L from 'leaflet';
import { each } from 'jquery';
@Component({
  selector: 'app-osm-map',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']


})
export class OsmMapComponent implements AfterViewInit {
    private map;
    markers: L.Layer[] = [];
    private geojsonLayer;

    popupText = "Some popup text";

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };

    private initMap(): void {
      this.map = L.map('map', {
        center: [ 51.04962 , 12.1369 ],
        zoom: 10
      });
  
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  
      tiles.addTo(this.map);
      
     
    
    }
  constructor() { 
     
  
    
  }

  addLayer() {
    var jsonString = JSON.stringify(shp3);
    var jsonOBJ = JSON.parse(jsonString); 

    this.geojsonLayer = new L.GeoJSON(jsonOBJ);   

  
    this.geojsonLayer.addTo(this.map);


    this.geojsonLayer.on('click', function(e) {
      console.log(e.layer); 
      if(e.layer.selected) {
        
        e.layer.selected = false;
      } else {
       
        e.layer.selected = true;
      }
    });

    


    /*this.geojsonLayer.on("click", e => {      
     
      this.map.zoomIn();

      console.log(this.geojsonLayer); 


      
       
    });*/


  }

  addMarker() {
 
    const newMarker = L.marker([51.04962 , 12.1369], this.markerIcon);

    this.markers.push(newMarker);

    newMarker.addTo(this.map);
  }

 

  ngAfterViewInit(): void {
    this.initMap();

    console.log("first" + this.map);

  
 /*   this.map.on("click", e => {      
      this.map.zoomIn();
      this.map.panTo([e.latlng.lat, e.latlng.lng]);    
    });*/
       
 
  }
}

