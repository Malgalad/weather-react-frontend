import React, { Component } from 'react';
import '../style.css'
import $ from 'jquery'

class DataContainer extends Component {

  render() {
    return (
        <div className="container">
          <p className="text">City name: {this.props.data.name}</p>
          <p className="text">Weather: {this.props.data.weather[0].main}</p>
          <p className="text">Weather: {this.props.data.weather[0].description}</p>
          <p className="text">Temperature: {this.props.data.main.temp}</p>
          <p className="text">Pressure: {this.props.data.main.pressure}</p>
          <p className="text">Humidity: {this.props.data.main.humidity}</p>
        </div>
    );
  }
}

export default DataContainer;
