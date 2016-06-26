import React, { Component } from 'react';
import socket from '../../utils/socket';
import _ from 'lodash';
import MapContainer from '../MapContainer/mapContainer';

import './style.scss';

function sendPulse() {
  socket.emit('client_pulse', {});
}

const sendPulseDbd = _.throttle(sendPulse, 500, { trailing: false });

export class App extends Component {
  render() {
    return (
      <section>
        <div className="container">
          <MapContainer />
          <button onClick={()=>sendPulseDbd()}>Pulse</button>
        </div>
      </section>
    );
  }
}
