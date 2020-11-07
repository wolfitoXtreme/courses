import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

// without Redux Action Creators
// import actionTypes from '../../store/actions/actions';
import * as actions from '../../store/actions/index';
import './CounterRedux.scss';

interface ItemProps {
  id: number;
  value: number;
  removeItem: (...args: any[]) => void;
}

const Item: React.FC<ItemProps> = ({ id, value, removeItem }) => {
  const [deleting, setDeleting] = useState(false);

  if (deleting) {
    removeItem(id);
  }

  return (
    <li
      onClick={() => {
        setDeleting(true);
      }}
    >
      {!deleting ? value : 'deleting...'}
    </li>
  );
};

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
  const testFunc = (val: number) => {
    console.log(val);
  };

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
          // <li key={id} onClick={() => onDeleteResult(id)}>
          //   {value}
          // </li>
          <Item key={id} id={id} value={value} removeItem={onDeleteResult} />
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
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {
    // onAdd: () => dispatch({ type: actionTypes.ADD }),
    onAdd: () => dispatch(actions.add()),
    // onRemove: () => dispatch({ type: actionTypes.REMOVE }),
    onRemove: () => dispatch(actions.remove()),
    // onMultiply: () => dispatch({ type: actionTypes.MULTIPLY, value: 5 }),
    onMultiply: () => dispatch(actions.multiply(5)),
    // onDivide: () => dispatch({ type: actionTypes.DIVIDE, value: 5 }),
    onDivide: () => dispatch(actions.divide(5)),
    // onStoreResult: (result: any[]) =>
    //   dispatch({ type: actionTypes.STORE_RESULT, result: result }),
    onStoreResult: (result: number) => dispatch(actions.storeResult(result)),
    // onDeleteResult: (id: number) =>
    //   dispatch({ type: actionTypes.DELETE_RESULT, id: id }),
    onDeleteResult: (id: number) => dispatch(actions.deleteResult(id)),
  };
};

// Connect and export
// export default connect(null, mapDispatchToProps)(Counter); // first param can be null when no state is needed
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
