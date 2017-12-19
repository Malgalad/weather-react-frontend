import React, { Component } from 'react';
import '../style.css'

function OptionCountryItem(props) {
    return <option key={props.country.alpha2Code} value={props.country.alpha2Code}>{props.country.name}</option>
}

class CountryList extends Component {

  constructor(props) {
    super(props);
    this.reqUrl = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';
    this.state = { optCountrySet : null}

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.props.onCountryChange(e.target.value)
  }

  componentDidMount() {
    fetch(this.reqUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(response => {
      if (response.ok) {
        response.json().then(json => {
          this.setState({
            optCountrySet: json.map((country) => (
              <OptionCountryItem
               country={country}/>)
             )
          });
        });
      }
    });
  }

  render() {
    return (
      <select onChange={this.handleSelectChange} id="countries">
        {this.state.optCountrySet}
      </select>
    );
  }
}

export default CountryList;
