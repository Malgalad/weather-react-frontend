import React, { Component } from 'react';
import '../style.css'

function OptionCountryItem(props) {
    return <option value={props.country.alpha2Code}>{props.country.name}</option>
}

class CountryList extends Component {

  constructor(props) {
    super(props);
    this.reqUrl = 'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code';
    this.state = { optCountrySet :[<OptionCountryItem country={ {name:"France", alpha2Code:"fr"}}/>]}

    this.componentDidMount = this.componentDidMount.bind(this);
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
            optCountrySet: json.map((country) => <OptionCountryItem key={country.alpha2Code} country={country}/>)
          });
        });
      }
    });
  }

  render() {
    return (
      <select id="countries">
        {this.state.optCountrySet}
      </select>
    );
  }
}

export default CountryList;
