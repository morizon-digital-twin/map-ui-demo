import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import * as GemeindenJson from "../../../assets/shapedata/Einheitsgemeinden.json";
import * as shp2 from "../../../assets/shapedata/Shapefile2.json";
import * as shp3 from "../../../assets/shapedata/Shapefile3.json";
import * as L from 'leaflet';
import { each } from 'jquery';

@Component({
    selector: 'typography-cmp',
    moduleId: module.id,
    templateUrl: 'typography.component.html',
    styleUrls: ['./typography.component.scss']
})

export class TypographyComponent implements AfterViewInit {
    private map;
    markers: L.Marker[] = [];
    myMarkers = []; 
    private geojsonLayer;
    hospitalBool = false;
    markerCounter = 1; 

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
    this.hospitalBool = false; 
     
  
    
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


  clearMarkers() {
    for(var i = 0; i < this.markers.length; i++){
        this.map.removeLayer(this.markers[i]);
    }

    this.markers = [];
    this.myMarkers = [];
    this.markerCounter = 1; 

  }

  calculateRoute() {
    console.log(this.myMarkers); 


    for(var i = 0; i < this.markers.length; i++){
        alert(this.markers[i].getLatLng().lat); 
       
      
    }
  }

 

  ngAfterViewInit(): void {
    this.initMap();

    console.log("first" + this.map);

   

    this.map.on("click", e => {
        if ( this.hospitalBool === false ) {
        console.log(e.latlng); // get the coordinates

        var myMarker = {
            type: "hospital",
            title: "Krankenhaus", 
            lat: e.latlng.lat,
            lng: e.latlng.lng
        }
        this.myMarkers.push( myMarker );
        var newMarker = L.marker([e.latlng.lat, e.latlng.lng], 
              { draggable: true,
            autoPan: true, icon: L.icon({
                iconSize: [25, 41],
                iconAnchor: [10, 41],
                popupAnchor: [2, -40],
            
                // specify the path here
                iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/layers.png",
                shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
              }) }, ).bindTooltip("Krankenhaus", 
              {
                  permanent: true, 
                  direction: 'right'
              }).addTo(this.map); // add the marker onclick
              this.hospitalBool = true; 
              this.markers.push(newMarker);
            } else {

                var title = "Ort " + this.markers.length 
                var myMarker = {
                    type: "location",
                    title: title,
                    lat: e.latlng.lat,
                    lng: e.latlng.lng
                }
                this.myMarkers.push( myMarker );
                var newMarker = L.marker([e.latlng.lat, e.latlng.lng], 
                    { draggable: true,
                  autoPan: true, icon: L.icon({
                      iconSize: [25, 41],
                      iconAnchor: [10, 41],
                      popupAnchor: [2, -40],
                      // specify the path here
                      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
                      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
                    }) }, ).bindTooltip(title, 
                    {
                        permanent: true, 
                        direction: 'right'
                    }).addTo(this.map); // add the marker onclick

                  
                    this.markers.push(newMarker);
                    

            }
      });

  
 /*   this.map.on("click", e => {      
      this.map.zoomIn();
      this.map.panTo([e.latlng.lat, e.latlng.lng]);    
    });*/
       
 
  }
}


