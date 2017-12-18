import React, { Component } from 'react';
import '../style.css'
import $ from 'jquery'

function WeatherError(props) {
  return <p className="error">{props.error.message}</p>
}

export default WeatherError;
