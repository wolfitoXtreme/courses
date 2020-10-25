import React from 'react';

import './CounterOutput.scss';

interface CounterOutputProps {
  value: number;
}

const counterOutput:React.FC<CounterOutputProps> = ({value}) => (
    <div className="CounterOutput">
        Current Counter: {value}
    </div>
);

export default counterOutput;
