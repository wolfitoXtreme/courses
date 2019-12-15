// ---------------------
// Using react
// ---------------------



import * as React from 'react';
import CounterOutput from './counter-output';

// TypeScript interface
// interface IAppProps {};

// TypeScript interface
interface IAppState {
    counterValue: number; // counter as type number
};

class App extends React.Component<{}/* IAppProps */, IAppState> { // React.Component is a generic TypeScript class
    
    public state = {counterValue: 0};
  
    public render() {
        return (
            <div style={{textAlign: 'center'}}>
                <CounterOutput counter={this.state.counterValue} />
                <button onClick={this.incHandler}>Increment</button>
                <button onClick={this.decHandler}>Decrement</button>
            </div>
        );
    }

    private incHandler = () => {
        this.setState(prevState => { 
                return {counterValue: prevState.counterValue + 1};
        });
    };

    private decHandler = () => {
        this.setState(prevState => { 
                return {counterValue: prevState.counterValue - 1};
        });
    };
}

export default App;
