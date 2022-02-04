import React from 'react';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

import * as schools from './data/export.json';
import './App.css';

export default function App() {
  const [activePark, setActivePark] = React.useState(null);

  console.log(schools);

  // let Polygon = schools.features.filter(
  //   (school) => school.geometry.type === 'Polygon' && school.properties.name
  // );
  let Point = schools.features.filter(
    (school) => school.geometry.type === 'Point' && school.properties.name
  );

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
        <Map center={[27.7120406, 85.2878096]} zoom={16}>
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
                setActivePark(point);
              }}
            />
          ))}
          {activePark && (
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
                <h2>Name: {activePark.properties.name}</h2>

                <p>Operator: {activePark.properties.operator}</p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    </div>
  );
}
