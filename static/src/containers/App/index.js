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
          <button onClick={()=>sendPulse()}>CLICK</button>
          <div className="info-container">
            <div className="how">
              <h3><span className="red">&#60;</span> HOW TO <span className="red">&#62;</span></h3>
              <h5><span className="red">&#62;&#62;</span> Click the big button</h5>
              <h5><span className="red">&#62;&#62;</span> Watch your dot pop up on the map</h5>
            </div>
            <div className="about">
              <h3><span className="red">&#60;</span> ABOUT <span className="red">&#62;</span></h3>
              <h5>This is a simple way to visualize support around the world for the LGBTQ community. Wherever you are, whenever you want, for as much time as you feel like, you can share your love and the rest of the world will see it.</h5>
              <h5>No logins, no ads, just love.</h5>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
