import React from "react";

const Suggestions = props => {
  const option = props.results.map((data, index) => (
    <li key={index}>
      <button onClick={() => props.getStockDetails(index, data["1. symbol"])}>
        {data["2. name"]}
      </button>
    </li>
  ));
  return <ul>{option}</ul>;
};

export default Suggestions;
