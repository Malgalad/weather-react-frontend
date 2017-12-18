import React, { Component } from 'react';
import '../style.css'

function WeatherDataHolder(props) {
  return (
      <div className="container">
        <p className="text">City name: {props.data.name} </p>
        <p className="text">Weather: {props.data.weather[0].main} </p>
        <p className="text">Description: {props.data.weather[0].description}  </p>
        <p className="text">Temperature: {props.data.main.temp} C</p>
        <p className="text">Pressure: {props.data.main.pressure} </p>
        <p className="text">Humidity: {props.data.main.humidity} </p>
      </div>
  );
}

function WelcomeDataHolder(props) {
  return (
      <div className="container">
        <p className="text">Hello </p>
        <p className="text">Select your weather type req </p>
        <p className="text">( Zip or Cityname )   </p>
        <p className="text">and response</p>
        <p className="text">will be showed here </p>
        <p className="text">my dude </p>
      </div>
  );
}

class DataContainer extends Component {
  render() {
      if (this.props.data) {
        return <WeatherDataHolder data={this.props.data}/>
      } else {
        return <WelcomeDataHolder />
      }
  }
}

export default DataContainer;
