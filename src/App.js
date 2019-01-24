import React, { Component } from "react";
require("dotenv").config();

const API_URL = process.env.API_URL;

class App extends Component {
  state = {
    query: "",
    results: []
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        }
      }
    );
  };

  getInfo = () => {
    console.log(`${API_URL}`);
    fetch(`${API_URL}`).then(res => {
      console.log(res);
      this.setState({
        results: res.bestMatches
      });
    });
  };
  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <p>{this.state.results}</p>
      </form>
    );
  }
}

export default App;
