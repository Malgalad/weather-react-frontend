import React from 'react';
import '../style.css'

function WeatherError(props) {
  return <p className="error">{props.error.message}</p>
}

export default WeatherError;
