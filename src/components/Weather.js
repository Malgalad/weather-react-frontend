import React, { Component } from 'react';
import DataContainer from './DataContainer'
import WeatherError from './WeatherError'
import CountryList from './CountryList'
import '../style.css'
import $ from 'jquery'

class Weather extends Component {

  constructor(props) {
    super(props);
    this.base = 'http://api.openweathermap.org/data/2.5/weather?';
    this.appid = '6b218fbb4c0741d82f4ce29b3fe6a873';
    this.state = { data: null, error: null };
    this.reqType = 'zip';

    this.getWeather = this.getWeather.bind(this);
    this.updateReqType = this.updateReqType.bind(this);
  }

  validLetterSeq(seq) {
    return /^[a-zA-Z]+$/.test(seq);
  }

  updateReqType(e) {
    e.preventDefault();
    const type = e.currentTarget.value;
    this.reqType = type;
    $("#data").val("");
    $("#data").attr("placeholder", type);
  }

  getWeather(e) {
    e.preventDefault();
    const reqData = $("#data").val();
    const countryCode = $("#countries").val();
    let rbody;

    if (this.reqType === "zip") {
      if (!$.isNumeric(reqData)) {
        this.setState({ error: { message : "zip code should be numeric"} });
        return;
      }
      rbody = 'zip='  + reqData + "," + countryCode;
    } else if (this.reqType === "city-name") {
      if (!this.validLetterSeq(reqData)) {
        this.setState({ error: { message : "city name should contain only letters"} });
        return;
      }
      rbody = 'q=' + reqData + "," + countryCode;
    }

    fetch('http://ip-api.com/json').then((response) => {
      if (response.ok) {
        response.json().then(json => {
          const temp = (json.countryCode === 'US') ? 'imperial' : 'metric';
          const req = this.base + rbody + "&APPID=" + this.appid + "&units=" + temp;
          fetch(req, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }).then(response => { //refactor-le
            if (response.ok) {
              response.json().then(json => {
                this.setState({ data: json, error: null});
              });
            } else {
              response.json().then(json => {
                this.setState({ data: null, error: json});
              });
            }
          });
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <form className="login-form">
          <button className="country-type" value="zip" onClick={this.updateReqType}>Zip</button>
          <button className="country-type" value="city-name" onClick={this.updateReqType}>City-name</button>
            <input id="data" placeholder="zip"/>
            <CountryList />
            {this.state.error && <WeatherError error={this.state.error}/>}
            <button className="btn" onClick={this.getWeather}>get weather</button>
          </form>
        </div>
        <DataContainer data={this.state.data}/>
      </div>
    );
  }
}

export default Weather;
