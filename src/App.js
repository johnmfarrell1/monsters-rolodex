import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component'

import { SearchBox } from './components/search-box/search-box.component'

import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  render() {
    // equivalent to doing individually const monsters = this.state.monsters
    // creating constants so we dont change the base state (as to reset would mean a new get request
    const { monsters, searchField } = this.state;

    // filter local const array
    // 
    const filteredMonsters = monsters.filter(monsters => 
      monsters.name.toLowerCase().includes(searchField.toLowerCase())
      )
    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox 
          placeholder='search monsters...' 
          handleChange={this.handleChange}
          />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }

  // React Component life cycle method we can override
  componentDidMount(){
    // returns a promise
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    // use setState for better react redrawing
    // setState is asynchronous. to debug us callback param () =>  console.log(this.state)
    .then(users => this.setState({ monsters: users }))
  }
}

export default App;
