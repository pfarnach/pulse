import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import L from 'leaflet';
import { addCoord } from '../../actions';
import socket from '../../utils/socket';

import './style.scss';

const icon = L.divIcon({
  iconSize: [20, 20],
  className: 'red-dot-container',
  html: `<div class="red-dot"></div>`
});

class MapContainer extends Component {
	componentDidMount() {
		socket.on('new_pulse', (msg) => {
		  this.props.addCoord(msg);
		});
	}

	getMarkers(coords) {
		return coords.map((coord) => <Marker key={`${coord.latitude}${coord.longitude}`} position={[coord.latitude, coord.longitude]} icon={icon} />);
	}

	render() {
		return (
			<div>
				<Map id="map" center={[10, 0]} zoom={1}>
			    <TileLayer
			      url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
			      attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>' />
			    { this.getMarkers(this.props.coords) }
			  </Map>
		  </div>
		);
	}
}

function mapStateToProps(state) {
	return { coords: state.coords };
}

export default connect(mapStateToProps, { addCoord })(MapContainer);