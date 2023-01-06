import React from "react";
import { ACTION } from "./Calculator";

const NumeralKey = ({ dispatch, value }) => {
  return (
    <div>
      <button
        className="button"
        onClick={() => {
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: value } });
        }}
      >
        {value}
      </button>
    </div>
  );
};

export default NumeralKey;
