import React, { Component } from 'react';
import socket from '../../utils/socket';
import _ from 'lodash';
import MapContainer from '../MapContainer/mapContainer';

import './style.scss';

const sendPulse = _.throttle(() => socket.emit('client_pulse', {}), 250);

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
            <h1>Pulse</h1>
          </button>
          <div className="about-container">
            <h3>About</h3>
            <h5>It's simple - share your love and support for the LGBTQ community by pressing the button. Anyone else looking at the map will see your support pop up.</h5>
          </div>
        </section>
      </div>
    );
  }
}
