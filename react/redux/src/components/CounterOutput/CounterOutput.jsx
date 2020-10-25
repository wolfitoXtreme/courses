import React from 'react';

import './CounterOutput.scss';


const counterOutput = ({value}) => (
    <div className="CounterOutput">
        Current Counter: {value}
    </div>
);

export default counterOutput;
