import React from "react";

const StockDetails = props => (
  <div>
    <h1>{props.stockDetail["2. name"]}</h1>
    <h3>Last Updated: {props.lastUpdated}</h3>
    <div>
      <p>Open: {props.stockDetail["1. open"]}</p>
      <p>Close: {props.stockDetail["4. close"]}</p>
      <p>High: {props.stockDetail["2. high"]}</p>
      <p>Low: {props.stockDetail["3. low"]}</p>
      <p>Volume: {props.stockDetail["5. volume"]}</p>
    </div>
  </div>
);

export default StockDetails;
