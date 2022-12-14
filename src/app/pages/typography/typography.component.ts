import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import * as ortsteile from "../../../assets/shapedata/OrtsteileZeitz.json";

import Chart from 'chart.js';


import * as L from 'leaflet';

import * as zeitz from "../../../assets/shapedata/ZeitzBevoelkerung.json";
import * as gemeinden from "../../../assets/shapedata/Einheitsgemeinden.json";
import { data, each } from 'jquery';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { waitForAsync } from '@angular/core/testing';
import { bottom } from '@popperjs/core';





@Component({
  selector: 'typography-cmp',
  moduleId: module.id,
  templateUrl: 'typography.component.html',
  styleUrls: ['./typography.component.scss']
})

export class TypographyComponent implements AfterViewInit, OnInit {
  private map;
  markers: L.Marker[] = [];
  layers: L.Layer[] = [];
  public canvas : any;
  public ctx;
  selectedDistrict1; 
  public chartColor;
  public chartEmail;
  public chartHours;

  calculationResult = []; 

  duration = [];
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
  hospitalMarker: L.Marker;
  circle: L.Layer;
  distance = [];
  shapeLayer2: any;
  shapeLayer3: L.GeoJSON<any>;
  durationSum = 0;
  distanceSum = 0;
  circleDrawn: boolean = false;
  zeitzPop2000: { einwohner: number; u25: { m: number; w: number; }; b25_45: { m: number; w: number; }; b45_65: { m: number; w: number; }; u65: { m: number; w: number; }; };



  gardenStyle() {
    return {
      fillColor: "#FF00FF",
      fillOpacity: 0.1,
      color: '#B04173',
    };
  }

  gardenStyle2() {
    return {
      fillColor: "green",
      fillOpacity: 0.01,
      color: 'green',
    };
  }

  gardenStyle3() {
    return {
      fillColor: "blue",
      fillOpacity: 0.1,
      color: 'blue',
    };
  }

  ngOnInit() {


    this.zeitzPop2000 = {
    
      einwohner: 14891,
      u25: {
        m: 1430,
        w: 1314,
      },
  
      b25_45: {
        m: 1211,
        w: 1326,
  
      },
      b45_65: {
        m: 2582,
        w: 2546,
  
      },
      u65: {
        m: 1785,
        w: 2697,
      }
    };

    this.canvas = document.getElementById("chartEmail");
    this.canvas.style.width = 40;
    this.canvas.style.height = 100;


   
     this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['U25 M', 'U25 W', '25-45 M', '25-45 W', '45-65 M', '45-65 W','65+ M', '65+ W'],
          datasets: [{
            label: "Alterstruktur",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157',
              '#76b5c5',
              '#873e23',
              '#063970',
              '#e28743'
            ],
            borderWidth: 0,
            data: [this.zeitzPop2000.u25.m,this.zeitzPop2000.u25.w, this.zeitzPop2000.b25_45.m,this.zeitzPop2000.b25_45.w, this.zeitzPop2000.b45_65.m,this.zeitzPop2000.b45_65.w, this.zeitzPop2000.u65.m,this.zeitzPop2000.u65.w,]
          }]
        },

       

        options: {
          responsive: true,
          maintainAspectRatio: false,

          legend: {
            display: true,
            position: 'right'
          },
          

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: true
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      }); 
  }


  drawCircle() {



    if (this.hospitalBool) {
      var lat = this.markers[0].getLatLng().lat;
      var lng = this.markers[0].getLatLng().lng;

      this.circle = L.circle([lat, lng], 2000).addTo(this.map);
      this.circleDrawn = true; 

    }

  }



  private initMap(): void {



    var jsonString = JSON.stringify(zeitz);
    var jsonOBJ = JSON.parse(jsonString);
    this.geojsonLayer = new L.GeoJSON(jsonOBJ);

    var jsonString2 = JSON.stringify(gemeinden);
    var jsonOBJ2 = JSON.parse(jsonString2);
    this.geojsonLayer2 = new L.GeoJSON(jsonOBJ2);

    var jsonString3 = JSON.stringify(ortsteile);
    var jsonOBJ3 = JSON.parse(jsonString3);
    this.geojsonLayer3 = new L.GeoJSON(jsonOBJ3);



    // this.geojsonLayer.addTo(this.map);

    //var shapes = L.layerGroup([this.geojsonLayer, this.geojsonLayer2, this.geojsonLayer3]);

    var shapeLayer = L.geoJSON(jsonOBJ, {
      style: this.gardenStyle,

      /* onEachFeature: function (feature, layer) {
         layer.bindPopup('<h1>'+feature.properties.f1+'</h1><p>name: '+feature.properties.f2+'</p>'); }*/


      onEachFeature: function popUp(f, l) {
        var out = [];
        if (f.properties) {
          for (var key in f.properties) {
            out.push(key + ": " + f.properties[key]);
          }
          l.bindPopup(out.join("<br />"));
        }
      }

    });

    this.shapeLayer2 = L.geoJSON(jsonOBJ2, {
      style: this.gardenStyle2,

      onEachFeature: function popUp(f, l) {
        var out = [];
        if (f.properties) {
          for (var key in f.properties) {
            out.push(key + ": " + f.properties[key]);
          }
          l.bindPopup(out.join("<br />"));
        }
      }





    });

    this.shapeLayer2.on("click", e => {

   
      
   
      this.map.zoomIn();

      this.map.removeLayer(this.shapeLayer2); 
      this.map.addLayer(this.shapeLayer3); 
      

    }); 

    this.shapeLayer3 = L.geoJSON(jsonOBJ3, {
      style: this.gardenStyle3,

      onEachFeature: function popUp(f, l) {
        var out = [];
        if (f.properties) {
          for (var key in f.properties) {
            out.push(key + ": " + f.properties[key]);
          }
          l.bindPopup(out.join("<br />"));
        }
      }
    });


   




   /* shapeLayer3.on("click", e => {

      if (this.hospitalBool === false) {
        console.log(e.latlng); // get the coordinates

        var myMarker = {
          type: "hospital",
          title: "??rztehaus",
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          distance: 0,
          duration: 0

        }
        this.myMarkers.push(myMarker);
        this.hospitalMarker = L.marker([e.latlng.lat, e.latlng.lng],
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
          },).bindTooltip("??rztehaus",
            {
              permanent: true,
              direction: 'right'
            }).addTo(this.map); // add the marker onclick
        this.hospitalBool = true;
        this.markers.push(this.hospitalMarker);

      }

      else {


        var title = "Ort " + this.markers.length
        var myMarker = {
          type: "location",
          title: title,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          distance: 0,
          duration: 0
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
*/

    //var layerMap = L.layerGroup([shapeLayer, shapeLayer2 ]); 














    this.map = L.map('map', {
      center: [51.04962, 12.1369], // "Zeitz"
      zoom: 9,
      //layers: [ layerMap ]

    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);



    var overlayMaps = {
      "Gemeinden": this.shapeLayer2,
      "Ortsteile": this.shapeLayer3,
      "none": L.tileLayer(''),
    };

    this.map.addLayer(this.shapeLayer2); 

    var layerControl = L.control.layers(overlayMaps).addTo(this.map);

    //  shapeLayer.addTo(this.map); 






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

  clearLayerOnDrag() {

    this.durationSum = 0;
    this.distanceSum = 0; 
  
    for (var i = 0; i < this.layers.length; i++) {
      console.log(this.layers[i]);
      this.map.removeLayer(this.layers[i]);
    }
   
    this.layers = [];

    for (var i = 0; i < this.myMarkers.length; i++) {
      this.myMarkers[i].distance = 0; 
      this.myMarkers[i].duration = 0;
    }

  }



  clearMarkers() {
  
    this.markerCounter = 1;
    this.hospitalBool = false;
    this.circleDrawn = false; 
    this.durationSum = 0; 
    this.distanceSum = 0;
  

    


    for (var i = 0; i < this.markers.length; i++) {
      this.map.removeLayer(this.markers[i]);
    }


 
    for (var i = 0; i < this.layers.length; i++) {
      console.log(this.layers[i]);
      //this.layers[i].clearLayers();
      this.map.removeLayer(this.layers[i]);
    }

    

    this.map.removeLayer(this.circle);
    


  

   /* this.map.eachLayer(function (layer) {
      console.log(layer);
      if (layer instanceof L.Layer) {
        this.map.removeLayer(layer)
      }
    })*/
   
    this.layers = [];
    this.markers = [];
    this.markers.length = 0; 
    this.myMarkers = [];

    

  }


  async calculateRoute() {
    console.log(this.myMarkers);
    // hospital


    var lat = this.markers[0].getLatLng().lat;
    var lng = this.markers[0].getLatLng().lng;

    var urlBase = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62480ebc930105be49ff8b156131f6895d6f&start=' + lng + ',' + lat;
    var urlBase2 = 'https://osrm.bunsencloud.de/route/v1/driving/' + lng + "," + lat; // "12.118548129879468,51.07980746234024;12.140293815251148,51.04451465548099?steps=true'

    for (var i = 1; i < this.markers.length; i++) {

      var url = urlBase + '&end=' + this.markers[i].getLatLng().lng + ',' + this.markers[i].getLatLng().lat;

      const markers = this.myMarkers;
      this.http.get<any>(url).subscribe(data => {


        var gardenLayer = L.geoJSON(data, {
          style: this.gardenStyle

        });

        gardenLayer.addTo(this.map);
        this.layers.push(gardenLayer);



        this.duration.push(data.features[0].properties.summary.duration);
        this.distance.push(data.features[0].properties.summary.distance);

        console.log("duration zero");
        console.log(this.duration.length);









      })

    }
    this.delay(4000);


  }

  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => {
        
      for (var i = 0; i < this.duration.length; i++) {
        //ignore hospital
        this.myMarkers[i + 1].duration = this.duration[i] ;
        this.myMarkers[i + 1].distance = ( this.distance[i] / 1000 ) + ' km';

        this.durationSum = this.durationSum + this.duration[i];

        this.distanceSum = this.distanceSum + this.distance[i];
      
        
        
      }

      /*const dur = this.durationSum;
      const dist = this.distanceSum;

      alert(dur + " " + dist); 
      var calc = {
        dur  : dur,
        dist : dist
      }

      this.durationSum = 0; 
      this.distanceSum = 0; 

      this.calculationResult.push(calc)
      console.log(this.calculationResult); */
    });
  }


  ngAfterViewInit(): void {
    this.initMap();


    //sample of 2000m Filter by Hand:



    


    var jsonString = JSON.stringify(zeitz);
    var jsonOBJ = JSON.parse(jsonString);

    this.geojsonLayer = new L.GeoJSON(jsonOBJ);







    this.map.on("click", e => {
      if (this.hospitalBool === false) {
        console.log(e.latlng); // get the coordinates

        var myMarker = {
          type: "hospital",
          title: "??rztehaus",
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          distance: 0,
          duration: 0

        }
        this.myMarkers.push(myMarker);
        this.hospitalMarker = L.marker([e.latlng.lat, e.latlng.lng],
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
          },).bindTooltip("??rztehaus",
            {
              permanent: true,
              direction: 'right'
            }).addTo(this.map); // add the marker onclick
        this.hospitalBool = true;
        //const clearLayerOnDrag = this.clearLayerOnDrag();
        var layers = this.layers;
        var myMarkers = this.myMarkers;
        this.hospitalMarker.on('drag', function (e) {
          console.log("hello world"); 
          
          console.log(layers); 
          for (var i = 0; i < layers.length; i++) {
            console.log(layers[i]);
            this.map.removeLayer(this.layers[i]);
          }
         
          layers = [];
          console.log(layers); 
      
          for (var i = 0; i < myMarkers.length; i++) {
           myMarkers[i].distance = 0; 
            myMarkers[i].duration = 0;
          }

          console.log(myMarkers); 

          
         

          






      });
      this.hospitalMarker.on('click', L.DomEvent.stopPropagation);

        this.markers.push(this.hospitalMarker);

      } else {


        var title = "Ort " + this.markers.length
        var myMarker = {
          type: "location",
          title: title,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          distance: 0,
          duration: 0
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
 

  }
}



