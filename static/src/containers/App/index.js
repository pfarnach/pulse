import React, { Component } from 'react';
import socket from '../../utils/socket';
import _ from 'lodash';
import MapContainer from '../MapContainer/mapContainer';

import './style.scss';

const sendPulse = _.debounce(() => socket.emit('client_pulse', {}), 500, { leading: true });

export class App extends Component {
  render() {
    return (
      <div className="main-container">
        <section className="content-container">
          <div className="title-container">
            <h1 className="title"><span className="title-1">LGBTQ</span><span className="title-2">Pulse</span></h1>
          </div>
          <MapContainer />
          <button onClick={()=>sendPulse()}>
            <h1>CLICK</h1>
          </button>
          <div className="info-container">
            <div className="how">
              <h3>HOW TO</h3>
              <h5>1) Click the button</h5>
              <h5>2) Watch your dot show up on the map</h5>
            </div>
            <div className="about">
              <h3>ABOUT</h3>
              <h5>This is meant to be a simple but important way to visualize support for the LGBTQ community around the world. Wherever you are, whenever you want, you can share your love and the rest of the world will see it.</h5>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
