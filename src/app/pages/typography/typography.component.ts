import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import * as ortsteile from "../../../assets/shapedata/Ortsteile_Zeitz.json";
import * as einheitsgemeinden from "../../../asset/shapedata/Einheitsgemeinden.json";
import * as zeitz from "../../../asset/shapedata/Zeitz_Bevoelkerung.json";



import * as L from 'leaflet';
import { each } from 'jquery';
import { HttpClientModule, HttpClient } from '@angular/common/http'





@Component({
  selector: 'typography-cmp',
  moduleId: module.id,
  templateUrl: 'typography.component.html',
  styleUrls: ['./typography.component.scss']
})

export class TypographyComponent implements AfterViewInit {
  private map;
  markers: L.Marker[] = [];
  layers: L.Layer[] = [];
  myMarkers = [];
  private geojsonLayer;
  hospitalBool = false;
  markerCounter = 1;
  gardenLayer;
  pantryLayer;
  selection;
  selectedLayer;

  geojsonLayer2: L.GeoJSON<any>;
  geojsonLayer3: L.GeoJSON<any>;
  shapelayers: L.Layer[] = [];


 
  gardenStyle( ) {
    return {
      fillColor: "#FF00FF",
      fillOpacity: 1,
      color: '#B04173',
    };
  }
  
 

  private initMap(): void {
    this.map = L.map('map', {
      center: [51.04962, 12.1369], // "Zeitz"
      zoom: 10,

    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);






  }
  constructor(private http: HttpClient) {
    this.hospitalBool = false;



  }

  addLayer() {
   /* var jsonString = JSON.stringify(shp3);
    var jsonOBJ = JSON.parse(jsonString);

    this.geojsonLayer = new L.GeoJSON(jsonOBJ);


    this.geojsonLayer.addTo(this.map);


    this.geojsonLayer.on('click', function (e) {
      console.log(e.layer);
      if (e.layer.selected) {

        e.layer.selected = false;
      } else {

        e.layer.selected = true;
      }
    });
*/



    /*this.geojsonLayer.on("click", e => {      
     
      this.map.zoomIn();

      console.log(this.geojsonLayer); 


      
       
    });*/


  }



  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      this.map.removeLayer(this.markers[i]);
    }
    for (var i = 0; i < this.layers.length; i++) {
      console.log(this.layers[i]);
      //this.layers[i].clearLayers();
      this.map.removeLayer(this.layers[i]);
    }

    this.map.eachLayer(function (layer) {
      console.log(layer);
      if (layer instanceof L.Layer) {
        this.map.removeLayer(layer)
      }
    })

    this.layers = [];
    this.markers = [];
    this.myMarkers = [];
    this.markerCounter = 1;
    this.hospitalBool = false;

  }

  calculateRoute() {
    console.log(this.myMarkers);
    // hospital


    var lat = this.markers[0].getLatLng().lat;
    var lng = this.markers[0].getLatLng().lng;

    var urlBase = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62480ebc930105be49ff8b156131f6895d6f&start=' + lng + ',' + lat;

    for (var i = 1; i < this.markers.length; i++) {

      var url = urlBase + '&end=' + this.markers[i].getLatLng().lng + ',' + this.markers[i].getLatLng().lat;
      this.http.get<any>(url).subscribe(data => {
        console.log(data)
       
        var gardenLayer =  L.geoJSON(data     ,{
          style: this.gardenStyle
         
        });    
                       
        gardenLayer.addTo(this.map);
        this.layers.push(gardenLayer);

      })


    }
  }



  ngAfterViewInit(): void {
    this.initMap();


    var jsonString = JSON.stringify(einheitsgemeinden);
    var jsonOBJ = JSON.parse(jsonString); 

    this.geojsonLayer = new L.GeoJSON(jsonOBJ);   

  
   // this.geojsonLayer.addTo(this.map);

    //var shapes = L.layerGroup([this.geojsonLayer, this.geojsonLayer2, this.geojsonLayer3]);

    var shapeLayer =  L.geoJSON(jsonOBJ   ,{
      //style: this.gardenStyle
     
    });    
   

    
    

  
    shapeLayer.addTo(this.map); 
    shapeLayer.on('click', function(e) { console.log(e) });


    this.map.on("click", e => {
      if (this.hospitalBool === false) {
        console.log(e.latlng); // get the coordinates

        var myMarker = {
          type: "hospital",
          title: "Krankenhaus",
          lat: e.latlng.lat,
          lng: e.latlng.lng
        }
        this.myMarkers.push(myMarker);
        var newMarker = L.marker([e.latlng.lat, e.latlng.lng],
          {
            draggable: true,
            autoPan: true, icon: L.icon({
              iconSize: [25, 41],
              iconAnchor: [10, 41],
              popupAnchor: [2, -40],

              // specify the path here
              iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/layers.png",
              shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
            })
          },).bindTooltip("Krankenhaus",
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
        this.myMarkers.push(myMarker);
        var newMarker = L.marker([e.latlng.lat, e.latlng.lng],
          {
            draggable: true,
            autoPan: true, icon: L.icon({
              iconSize: [25, 41],
              iconAnchor: [10, 41],
              popupAnchor: [2, -40],
              // specify the path here
              iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
              shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
            })
          },).bindTooltip(title,
            {
              permanent: true,
              direction: 'right'
            }).addTo(this.map); // add the marker onclick


        this.markers.push(newMarker);


      }
    });





    //shapes.addTo(this.map);


    //this.geojsonLayer.addTo(this.map);


    /*   this.map.on("click", e => {      
         this.map.zoomIn();
         this.map.panTo([e.latlng.lat, e.latlng.lng]);    
       });*/


  }
}




function gardenOnEachFeature(feature: any, layer: any) {
  throw new Error('Function not implemented.');
}

