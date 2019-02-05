import './App.css';
import mentors from './mentors.json';

import React, { Component } from 'react';
import { tags, countries } from './lists';
import AutoComplete from './AutoComplete';
import MentorsList from './MentorsList';
import Logo from './Logo';

const tagsSource = tags.map(tag => ({title: tag}));
const countriesSource = countries.map(country => ({title: country}));

// const serverEndpoint = 'http://localhost:3001';
class App extends Component {
  state = {
    mentors
  }

  handleTagSelect = (result) => {
    this.setState({
      tag: result.title
    })
  }

  handleCountrySelect = (result) => {
    this.setState({
      country: result.title
    })
  }

  filterMentors = mentor =>  {
    const { tag, country } = this.state;
    return (!tag || mentor.tags.includes(tag)) &&
           (!country || mentor.country === country);
  }

  resetTag = () => {
    this.setState({
      tag: '',
    });
  }

  resetCountry = () => {
    this.setState({
      country: ''
    });
  }

  // async componentDidMount() {
  //   const mentors = await fetch(`${serverEndpoint}/get_mentors`).then(res => res.json());
  //   this.setState({
  //     mentors
  //   })
  // }

  render() {
    const mentors = this.state.mentors.filter(this.filterMentors);

    for (let index = 0; index < 7; index++) {
      mentors.push(...mentors);
    }

    return (
      <div className="app">
        <header className="main-header">
          <h1>Search for mentor</h1>
          <Logo
            width={110}
            height={50}
            color="#009d6e" />
        </header>
        <AutoComplete
          placeholder="Language or Technology"
          source={tagsSource}
          handleResultSelect={this.handleTagSelect}
          onReset={this.resetTag}
        />
        <AutoComplete
          placeholder="Country"
          source={countriesSource}
          handleResultSelect={this.handleCountrySelect}
          onReset={this.resetCountry}
        />
        <MentorsList
          mentors={mentors}
        />
      </div>
    );
  }
}

export default App;
