import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

import actionTypes from "../../store/actions";
import "./CounterRedux.scss";

interface Props {
  counter: number;
  storedResults?: any[];
  onAdd: (...args: any[]) => void;
  onRemove: (...args: any[]) => void;
  onMultiply: (...args: any[]) => void;
  onDivide: (...args: any[]) => void;
  onStoreResult: (...args: any[]) => void;
  onDeleteResult: (...args: any[]) => void;
}

const Counter: React.FC<Props> = ({
  counter,
  storedResults,
  onAdd,
  onRemove,
  onMultiply,
  onDivide,
  onStoreResult,
  onDeleteResult,
}) => {
  return (
    <div>
      <h2>Counter WITH REDUX</h2>
      <CounterOutput value={counter} />
      <CounterControl label="Increment" clicked={onAdd} />
      <CounterControl label="Decrement" clicked={onRemove} />
      <CounterControl label="Multiply 5" clicked={onMultiply} />
      <CounterControl label="Divide 5" clicked={onDivide} />
      <hr />

      {/*
        Before combining Reducers
        <button onClick={onStoreResult} className="button">Store Result</button>
      */}

      <button onClick={() => onStoreResult(counter)} className="button">
        Store Result
      </button>
      <ul className="stored">
        {storedResults?.map(({ id, value }) => (
          <li key={id} onClick={() => onDeleteResult(id)}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

interface StateInt {
  counterRd: { counter: number };
  resultRd: { results: any[] };
}

// get the Store state
const mapStateToProps = (state: StateInt) => {
  return {
    // counter: state.counter, // before splitting and combining reducers
    // storedResults: state.results, // before splitting and combining reducer
    counter: state.counterRd.counter, // points to the sub state counterRd
    storedResults: state.resultRd.results, // points to the sub state resultRd
  };
};

// read as action.WHATEVER inside the reducer
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onAdd: () => dispatch({ type: actionTypes.ADD }),
    onRemove: () => dispatch({ type: actionTypes.REMOVE }),
    onMultiply: () => dispatch({ type: actionTypes.MULTIPLY, value: 5 }),
    onDivide: () => dispatch({ type: actionTypes.DIVIDE, value: 5 }),
    onStoreResult: (result: any[]) =>
      dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    onDeleteResult: (id: number) =>
      dispatch({ type: actionTypes.DELETE_RESULT, id: id }),
  };
};

// Connect and export
// export default connect(null, mapDispatchToProps)(Counter); // first param can be null when no state is needed
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
