import React from "react";

const ResultSceen = ({ current, previous, operation }) => {
  return (
    <div className="output">
      <div className="previousOperation">
        {previous}
        {operation}
      </div>
      <div className="current">{current} </div>
    </div>
  );
};

export default ResultSceen;
