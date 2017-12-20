import React, { Component } from 'react';
import '../style.css';
import { reqUrl } from '../constants';
import { getJSON } from '../api';

function OptionCountryItem(props) {
  return <option value={props.country.alpha2Code}>{props.country.name}</option>
}

class CountryList extends Component {

  constructor(props) {
    super(props);
    this.state = { optCountrySet: [], selected: '' };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(e) {
    this.setState({ selected: e.target.value });
    this.props.onCountryChange(e.target.value);
  }

  componentDidMount() {
    getJSON(reqUrl)
      .then(optCountrySet => this.setState({ optCountrySet }));
  }

  render() {
    return (
      <select onChange={this.handleSelectChange} value={this.state.selected}>
        {this.state.optCountrySet.map(country =>
          <OptionCountryItem key={country.alpha2Code} country={country}/>
        )}
      </select>
    );
  }
}

export default CountryList;
