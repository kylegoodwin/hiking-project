import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.scss';
import L from 'leaflet';

//https://stackoverflow.com/questions/47723812/custom-marker-icon-with-react-leaflet
const iconPerson = new L.Icon({
  iconUrl: require('./img/my-location.png'),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(33, 33)
});


//Creates a Map using react-leaflet a reac wrapper for leaflet.js
export class MapArea extends Component {


  render() {
    let hikeMarkers;

    if (this.props.trails[0] !== undefined) {
      //Build a list of markers to apply to the map
      hikeMarkers = this.props.trails.map((hike) => {
        //Create a marker on the map for each hike, with given hike data
        return (
          <Marker key={hike.id} position={[hike.latitude, hike.longitude]}>
            <Popup>
              {hike.name} <br />
              {hike.location} <br />
              {hike.summary}
            </Popup>
          </Marker>
        );
      });
    }
    
    let locationMarker = <Marker position={[this.props.lat, this.props.lng]} icon={iconPerson} />
    
    const position = [this.props.lat, this.props.lng]
    return (
      //Initialzie the map at the given position, using tiles from OpenStretMap
      <Map key={position} center={position} zoom={9}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia2pnb29kd2lucyIsImEiOiJjam8zNnF4YmUwdTA3M3BybGtocWkzejY4In0.9eALJdo0A_rMgg2cgZWHlQ"
        />
        {hikeMarkers}
        {locationMarker}
      </Map>
    )
  }
}
