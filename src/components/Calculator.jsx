import React from "react";
import FunctionKey from "./FunctionKey";
import NumeralKey from "./NumeralKey";
import ResultSceen from "./ResultSceen";
import { useReducer } from "react";

const evaluate = (sign, first, second) => {
  let result = 0;

  switch (sign) {
    case "+": {
      result = parseFloat(first) + parseFloat(second);
      break;
    }
    case "-": {
      result = parseFloat(first) - parseFloat(second);
      break;
    }
    case "/": {
      result = parseFloat(first) / parseFloat(second);
      break;
    }
    case "*": {
      result = parseFloat(first) * parseFloat(second);
      break;
    }
  }
  return result;
};

export const ACTION = {
  MULTIPLDE_DIGIT: "multiplide-digit",
  DELETE_DIGIT: "delete-digit",
  CHOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  SOLVE: "solve",
};

const calculatorReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION.ADD_DIGIT: {
      if (payload.digit === 0 && state.current === "0") return state;
      if (payload.digit === "." && state.current.includes(".")) return state;
      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    }
    case ACTION.CHOSE_OPERATION: {
      if (!state.operation) {
        return {
          ...state,
          operation: payload.operation,
          previous: `${state.current}`,
          current: "",
        };
      }
      return {
        ...state,
        current: `${evaluate(state.operation, state.current, state.previous)}`,
        operation: null,
        previous: null,
      };
    }
    case ACTION.CLEAR: {
      return {
        ...state,
        current: "",
        previos: null,
        operation: null,
      };
    }
    case ACTION.DELETE_DIGIT: {
      if (state.current === "") return state;
      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    }
    case ACTION.SOLVE: {
      if (state.operation === "") return state;
      return {
        ...state,
        current: `${evaluate(state.operation, state.current, state.previous)}`,
        previous: null,
        operation: null,
      };
    }
  }
};

const Calculator = () => {
  const [{ current, previous, operation }, dispatch] = useReducer(
    calculatorReducer,
    {}
  );
  return (
    <div className="calculator grid">
      <div className="output">
        <ResultSceen
          current={current}
          previous={previous}
          operation={operation}
        />
      </div>
      <button
        className="button span-two"
        onClick={() => dispatch({ type: ACTION.CLEAR })}
      >
        AC
      </button>
      <button
        className="button"
        onClick={() => dispatch({ type: ACTION.DELETE_DIGIT })}
      >
        DEL
      </button>
      <FunctionKey dispatch={dispatch} symbol={"/"} />
      <NumeralKey dispatch={dispatch} value={7} />
      <NumeralKey dispatch={dispatch} value={8} />
      <NumeralKey dispatch={dispatch} value={9} />
      <FunctionKey dispatch={dispatch} symbol={"*"} />
      <NumeralKey dispatch={dispatch} value={4} />
      <NumeralKey dispatch={dispatch} value={5} />
      <NumeralKey dispatch={dispatch} value={6} />
      <FunctionKey dispatch={dispatch} symbol={"+"} />
      <NumeralKey dispatch={dispatch} value={1} />
      <NumeralKey dispatch={dispatch} value={2} />
      <NumeralKey dispatch={dispatch} v alue={3} />
      <FunctionKey dispatch={dispatch} symbol={"-"} />
      <NumeralKey dispatch={dispatch} value={"."} />
      <NumeralKey dispatch={dispatch} value={0} />
      <button
        className="button span-two"
        onClick={() => dispatch({ type: ACTION.SOLVE })}
      >
        =
      </button>
    </div>
  );
};

export default Calculator;
