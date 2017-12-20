import React, { Component } from 'react';
import DataContainer from './DataContainer'
import WeatherError from './WeatherError'
import CountryList from './CountryList'
import '../style.css'
import { base, appid, ipAPI } from '../constants';
import { getJSON } from '../api';
import { isValidLetterSeq } from '../helpers';

class Weather extends Component {

  constructor(props) {
    super(props);
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

  updateReqType(e) {
    this.setState({ reqType: e.target.value, reqData: '' });
  }

  updateData(e) {
    this.setState({ reqData: e.target.value });
  }

  updateCountry(countryAlpha2Code) {
    this.setState({ curCountryCode: countryAlpha2Code });
  }

  getWeather() {
    let rbody;

    if (this.state.reqType === "zip") {
      if (isNaN(this.state.reqData)) {
        this.setState({ error: { message: "zip code should be numeric"} });
        return;
      }
      rbody = `zip=${this.state.reqData},${this.state.curCountryCode}`;
    } else if (this.state.reqType === "city-name") {
      if (!isValidLetterSeq(this.state.reqData)) {
        this.setState({ error: { message: "city name should contain only letters"} });
        return;
      }
      rbody = `q=${this.state.reqData},${this.state.curCountryCode}`;
    }

    getJSON(ipAPI)
      .then(loc => {
        const temp = (loc.countryCode === 'US') ? 'imperial' : 'metric';
        const req = `${base}${rbody}&APPID=${appid}&units=${temp}`;
        return getJSON(req);
      })
      .then(weatherData => this.setState({ weatherData, error: null }))
      .catch(error => this.setState({ weatherData: null, error }));
  }

  render() {
    return (
      <div>
        <div className="container">
          <form className="login-form">
            <button className="country-type" type="button" value="zip" onClick={this.updateReqType}>Zip</button>
            <button className="country-type" type="button" value="city-name" onClick={this.updateReqType}>City-name</button>
              <input
                id="data"
                value={this.state.reqData}
                onChange={this.updateData}
                placeholder={this.state.reqType}/>
              <CountryList onCountryChange={this.updateCountry}/>
              {this.state.error && <WeatherError error={this.state.error}/>}
              <button className="btn" type="button" onClick={this.getWeather}>get weather</button>
          </form>
        </div>
        <DataContainer data={this.state.weatherData}/>
      </div>
    );
  }
}

export default Weather;
