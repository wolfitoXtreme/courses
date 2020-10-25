import React from 'react';

import './CounterControl.scss';

const counterControl = ({ clicked, label }) => (
  <div className="CounterControl" onClick={clicked}>
    {label}
  </div>
);

export default counterControl;
