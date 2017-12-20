import React, { Component } from 'react';
import DataContainer from './DataContainer'
import WeatherError from './WeatherError'
import CountryList from './CountryList'
import '../style.css'

class Weather extends Component {

  constructor(props) {
    super(props);
    this.base = 'http://api.openweathermap.org/data/2.5/weather?';
    this.appid = '6b218fbb4c0741d82f4ce29b3fe6a873';
    this.state = {
      weatherData: null,
      error: null,
      reqType: 'zip',
      curCountryCode: '',
      reqData: ''
    };

    this.getWeather = this.getWeather.bind(this);
    this.updateReqType = this.updateReqType.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
  }

  validLetterSeq(seq) {
    return /^[a-zA-Z]+$/.test(seq);
  }

  updateReqType(e) {
    e.preventDefault();
    this.setState({ reqType: e.target.value, reqData: '' });
  }

  updateData(e) {
    this.setState({ reqData: e.target.value });
  }

  updateCountry(countryAlpha2Code) {
    this.setState({ curCountryCode: countryAlpha2Code });
  }

  getWeather(e) {
    e.preventDefault();
    let rbody;

    if (this.state.reqType === "zip") {
      if (!Number.isInteger(this.state.reqData)) {
        this.setState({ error: { message : "zip code should be numeric"} });
        return;
      }
      rbody = 'zip='  + this.state.reqData + "," + this.state.curCountryCode;
    } else if (this.state.reqType === "city-name") {
      if (!this.validLetterSeq(this.state.reqData)) {
        this.setState({ error: { message : "city name should contain only letters"} });
        return;
      }
      rbody = 'q=' + this.state.reqData + "," + this.state.curCountryCode;
    }

    fetch('http://ip-api.com/json').then((response) => {
      if (response.ok) {
        response.json().then(loc => {
          const temp = (loc.countryCode === 'US') ? 'imperial' : 'metric';
          const req = this.base + rbody + "&APPID=" + this.appid + "&units=" + temp;
          fetch(req, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }).then(response => { //refactor-le
            if (response.ok) {
              response.json().then(json => {
                this.setState({ weatherData: json, error: null });
              });
            } else {
              response.json().then(json => {
                this.setState({ weatherData: null, error: json });
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
            <input
              id="data"
              value ={this.state.reqData}
              onChange={this.updateData}
              placeholder={this.state.reqType}/>
            <CountryList onCountryChange={this.updateCountry}/>
            {this.state.error && <WeatherError error={this.state.error}/>}
            <button className="btn" onClick={this.getWeather}>get weather</button>
          </form>
        </div>
        <DataContainer data={this.state.weatherData}/>
      </div>
    );
  }
}

export default Weather;
