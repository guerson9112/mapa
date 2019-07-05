import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase';
import {FIREBASE_CONFIG} from '../../app/enviroment';
import {snapshotToArray} from '../../app/enviroment';
import * as Leaflet from 'leaflet';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  items = [];
  ref = firebase.database().ref('items/');
  
  constructor(public navCtrl: NavController) {
    this.ref.on('value', resp =>{
      //this.items = snapshotToArray(resp);
      //console.log(snapshotToArray(resp))
    });

  }
  
 
  ngOnInit() :void{
    this.drawMap();
    
  }
  
  
  drawMap(){
    let map  = Leaflet.map('map').setView([-0.1836298, -78.4821206], 13);
    Leaflet.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ3VlcnNvbjkxIiwiYSI6ImNqYnB5bHZydjRkNTczNHI2Mnp5MHNmbTgifQ.Y0IG84c_AgbmyDJ4waSF9g',{
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18   
    }).addTo(map);
    setInterval(()=>this.Mapa(map),5000);
  }
  
  Mapa(map){
    var cond : boolean = true;
     //var markers: (string | number)[][] = new Array();
     //markers.push(["casa 1", -0.30228479999999996, -78.55472639999999]);

     //web location
    map.locate({setView: true});
    
     //when we have a location draw a marker and accuracy circle
    function onLocationFound(e){
        var radius = e.accuracy / 10;
            
        Leaflet.marker(e.latlng).addTo(map)
          .bindPopup("Estas dentro de los "+radius+"metros desde este punto").openPopup();
        // var latitude = e.latitude;
          //var longitude = e.longitude;
          
        
        Leaflet.circle(e.latlng, radius).addTo(map);
        
        var item={
          sitio: "Mi ubicación",
          lat:  e.latlng.lat,
          lng: e.latlng.lng
        };
        console.log("a");
        guardar(item);
        //setInterval(()=>guardar(item),5000);

    }
    function guardar(item){
      var ref = firebase.database().ref('items/');
      var tiempo= new Date();
      var mili = tiempo.getTime();//.toLocaleString();
      var uid=mili.toString();
      console.log(tiempo);
      cond=false;
      //console.log("-------------------------");
     /* if(item!==undefined && item!==null){
        let newItem = ref.child(uid);
        newItem.set(item); 
      } */  
     /* for (var i = 0, len = markers.length; i < len; i++) {
      var marcador = new Leaflet.marker(markers[i].slice(1));
      marcador.addTo(map).bindPopup(markers[i][0]).openPopup();
      
    }  */
      
    }
    
    console.log("--------------------");
    
    map.on('locationfound',onLocationFound);
    
    //alert on location error
    function onLocationError(e){
      alert(e.message);
    }
    
    map.on('locationerror', onLocationError);

    
    
  }
  
  
}
