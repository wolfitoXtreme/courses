import React from "react";
import { connect } from "react-redux";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

import * as actionTypes from "../../store/actions";
import "./CounterRedux.scss";

const Counter = ({
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
        {storedResults.map(({ id, value }) => (
          <li key={id} onClick={() => onDeleteResult(id)}>
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

// get the Store state
const mapStateToProps = (state) => {
  return {
    // counter: state.counter, // before splitting and combining reducers
    counter: state.counterRd.counter, // points to the sub state counterRd
    storedResults: state.resultRd.results, // points to the sub state resultRd
  };
};

// read as action.WHATEVER inside the reducer
const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: () => dispatch({ type: actionTypes.ADD }),
    onRemove: () => dispatch({ type: actionTypes.REMOVE }),
    onMultiply: () => dispatch({ type: actionTypes.MULTIPLY, value: 5 }),
    onDivide: () => dispatch({ type: actionTypes.DIVIDE, value: 5 }),
    onStoreResult: (result) =>
      dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    onDeleteResult: (id) =>
      dispatch({ type: actionTypes.DELETE_RESULT, id: id }),
  };
};

// Connect and export
// export default connect(null, mapDispatchToProps)(Counter); // first param can be null when no state is needed
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
