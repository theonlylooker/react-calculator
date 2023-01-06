import React from "react";
import { ACTION } from "./Calculator";

const FunctionKey = ({ dispatch, symbol }) => {
  return (
    <div>
      <button
        className="button span-two"
        onClick={() => {
          dispatch({
            type: ACTION.CHOSE_OPERATION,
            payload: { operation: symbol },
          });
        }}
      >
        {symbol}
      </button>
    </div>
  );
};

export default FunctionKey;
