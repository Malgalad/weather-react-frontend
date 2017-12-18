import React, { Component } from 'react';
import DataContainer from './components/DataContainer'
import WeatherError from './components/WeatherError'
import CountryList from './components/CountryList'
import './style.css'
import $ from 'jquery'

class App extends Component {

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
    let type = e.currentTarget.value;
    this.reqType = type;
    $("#data").val("");
    $("#data").attr("placeholder", type);
  }

  getWeather(e) {
    e.preventDefault();
    let reqData = $("#data").val();
    let countryCode = $("#countries").val();
    var req;

    if (this.reqType === "zip") {
      if (!$.isNumeric(reqData)) {
        this.setState({ error: { message : "zip code should be numeric"} });
        return;
      }
      req = 'zip='  + reqData + "," + countryCode + "&APPID=" + this.appid;
    } else if (this.reqType === "city-name") {
      if (!this.validLetterSeq(reqData)) {
        this.setState({ error: { message : "city name should contain only letters"} });
        return;
      }
      req = 'q=' + reqData + "," + countryCode + "&APPID=" + this.appid;
    }
    fetch(this.base + req, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(response => {
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
            {this.state.error != null &&
              <WeatherError error={this.state.error}/>
            }
            <button className="btn" onClick={this.getWeather}>get weather</button>
          </form>
        </div>
        <DataContainer data={this.state.data}/>
      </div>
    );
  }
}

export default App;
