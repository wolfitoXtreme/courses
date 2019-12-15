import * as React from 'react';

// TypeScript interface
interface IHomeProps {
    name: string;   // type as string
    age: number;    // type as number
};

// function to get JSX content, will pass interface 'IHomeProps' as props
export class Home extends React.Component<IHomeProps, {}> { // second param is state, not used hence empty object
    render() {
        return (
            <div>
                Hello there, <b>{this.props.name}</b>, you are <b>{this.props.age}</b>, right?
            </div>
        );
    }
};

