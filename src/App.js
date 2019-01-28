import React, { Component } from "react";

import Suggestions from "../src/components/Suggestions";
import StockDetails from "../src/components/StockDetails";

const API_URL = process.env.REACT_APP_API_URL;

class App extends Component {
  state = {
    query: "",
    results: null,
    selectedStock: "",
    lastUpdated: ""
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getSymbolInfo();
          }
        }
      }
    );
  };

  getSymbolInfo = () => {
    fetch(`${API_URL}?sym= ${this.state.query}`)
      .then(res => res.json())
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          results: jsonData.bestMatches
        });
      });
  };

  getStockDetails = (index, symbol) => {
    this.eventSource = null;
    fetch(`${API_URL}detail?sym=${symbol}`)
      .then(res => res.json())
      .then(jsonData => {
        this.setState({
          selectedStock: {
            ...jsonData["Time Series (1min)"][
              Object.keys(jsonData["Time Series (1min)"])[0]
            ],
            ...this.state.results[index]
          },
          lastUpdated: Object.keys(jsonData["Time Series (1min)"])[0]
        });
        this.eventSource = new EventSource(
          `${API_URL}detailWtihSSE?sym=${symbol}`
        );
        this.eventSource.onmessage = e => {
          this.updateStockDetails(e.data, index);
        };
      });
  };

  updateStockDetails = (stockDetail, index) => {
    let jsonData = JSON.parse(stockDetail);
    const selectedStock = {
      ...jsonData["Time Series (1min)"][
        Object.keys(jsonData["Time Series (1min)"])[0]
      ],
      ...this.state.results[index]
    };

    this.setState({
      selectedStock,
      lastUpdated: Object.keys(jsonData["Time Series (1min)"])[0]
    });
  };

  render() {
    const { results, selectedStock, lastUpdated } = this.state;
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => (this.search = input)}
          onChange={this.handleInputChange}
        />
        {results && (
          <Suggestions
            results={this.state.results}
            getStockDetails={this.getStockDetails}
          />
        )}
        {selectedStock && (
          <StockDetails stockDetail={selectedStock} lastUpdated={lastUpdated} />
        )}
      </form>
    );
  }
}

export default App;
