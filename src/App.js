import React, { Component } from 'react';
import DataContainer from './components/DataContainer'
import WeatherError from './components/WeatherError'
import './style.css'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props);
    this.base = 'http://api.openweathermap.org/data/2.5/weather?';
    this.appid = '6b218fbb4c0741d82f4ce29b3fe6a873';
    this.state = { data: null, error: null };

    this.getWeather = this.getWeather.bind(this);
  }

  validLetterSeq(seq) {
    return /^[a-zA-Z]+$/.test(seq);
  }

  changeInputPlaceholder() {
    let reqType = $("#reqType").val();
    $("#data").attr("placeholder", reqType);
  }

  getWeather(e) {
    e.preventDefault();
    let reqType = $("#reqType").val();
    let reqData = $("#data").val();
    let countryCode = $("#countryCode").val();
    var req;

    if(!this.validLetterSeq(countryCode)) {
      this.setState({ error: { message : "county code should be two letters"} });
      return;
    }

    if (reqType == "zip") {
      if (!$.isNumeric(reqData)) {
        this.setState({ error: { message : "zip code should be numeric"} });
        return;
      }
      req = 'zip='  + reqData + "," + countryCode + "&APPID=" + this.appid;
    } else if (reqType == "city-name") {
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
            <select id="reqType" onChange={this.changeInputPlaceholder}>
              <option value="zip" selected>Zip</option>
              <option value="city-name">City Name</option>
            </select>
            <input id="data" placeholder="zip"/>
            <input id="countryCode" maxlength="2" placeholder="country code"/>
            {this.state.error != null &&
              <WeatherError error={this.state.error}/>
            }
            <button className="btn" onClick={this.getWeather}>get weather</button>
          </form>
        </div>
        {this.state.data != null &&
          <DataContainer data={this.state.data}/>
        }
      </div>
    );
  }
}

export default App;
