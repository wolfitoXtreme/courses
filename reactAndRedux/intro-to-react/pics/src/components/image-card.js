// 
// Image card
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// components

//

// logic
// --------------

//

// components
// --------------

// ImageCard
class ImageCard extends React.Component {

    // constructor method
    constructor(props) {
        super(props);
        this.state = {spans: 0};

        // component reference, 
        // used to get information from the element rendered
        // instead of using JS methods like clientHeight 
        this.imageRef = React.createRef(); 
    };

    // componentDidMount method
    componentDidMount() {
        console.log(this.imageRef);
        console.log('image height => ' + this.imageRef.current.clientHeight); // will get 0 as the image is not yet loaded
    
        this.imageRef.current.addEventListener('load', this.setSpans);
    }

    // custom function to get the height of the image within the grid
    setSpans = () => {
        console.log('image height => ' + this.imageRef.current.clientHeight, this.imageRef); // will get the actual height (image is loaded)
    
        const   height = this.imageRef.current.clientHeight,
                spans = Math.ceil(height / (10));

        this.setState({spans: spans});
    }

    // render method
    render() {

        console.log('image is', this.props.image);

        const { description, urls } = this.props.image; // defining two variables at once 
                                                        // matching the values inside props

        console.log('description = ' + description);

        return(
            <div style={{gridRowEnd: `span ${this.state.spans}`}}>
                <img 
                    src={urls.regular}
                    alt={description}
                    ref={this.imageRef}
                />
            </div>
        );
    };
};

export default ImageCard; // ES6 exports the component