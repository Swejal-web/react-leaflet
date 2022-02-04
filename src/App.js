import React, { useEffect } from 'react';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import * as parkData from './data/skateboard-parks.json';
import * as schools from './data/export.json';
import './App.css';

export const icon = new Icon({
  iconUrl: '/skateboarding.svg',
  iconSize: [25, 25],
});

export default function App() {
  const [activePark, setActivePark] = React.useState(null);

  console.log(schools);

  let Polygon = schools.features.filter(
    (school) => school.geometry.type === 'Polygon'
  );
  let Point = schools.features.filter(
    (school) => school.geometry.type === 'Point'
  );

  //let array = schools.elements.filter((school) => school.type === 'node');

  // for (let i in schools.elements) {
  //   if (schools.elements[i].type === 'node') {
  //     var shreya = schools.elements[i];
  //     var swejal = array.push(shreya);
  //   }
  // }

  //console.log(swejal);

  return (
    <div className='wrapper'>
      <div className='dashboard'>
        <div className='search'>
          <input type='text' placeholder='Search a school'></input>
          <i className='fas fa-search'></i>
        </div>
        <div className='content'>
          <li>content</li>
          <li>content</li>
          <li>content</li>
        </div>
      </div>
      <div className='container'>
        <Map center={[27.7201758, 85.3017867]} zoom={10}>
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {Point.map((point) => (
            <Marker
              key={point.id}
              position={[
                point.geometry.coordinates[1],
                point.geometry.coordinates[0],
              ]}
              onClick={() => {
                console.log('hy');
              }}
              icon={icon}
            />
          ))}
          {/* {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0],
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )} */}
        </Map>
      </div>
    </div>
  );
}
