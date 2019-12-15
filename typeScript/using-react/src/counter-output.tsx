import * as React from 'react';

// TypeScript interface
interface ICounterOutputProps {
    counter: number; // counter as type number
};

// function to get JSX content, will pass interface 'ICounterOutputProps' as props
const counterOutput = (props: ICounterOutputProps) => {
    return (
    <p style={{textAlign: 'center'}}>{props.counter}</p>
    );
};

export default counterOutput;