// 
// Image list
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// components
import ImageCard from './image-card';    // Image card
import './image-list.css';              // Webpack CSS import syntax, will import styles as embedded


// logic
// --------------

// 

// components
// --------------

// ImageList
const ImageList = (props) => {
    console.log('images are', props.images);

    // const   images = props.images.map(({alt_description, id, urls}) => { // taking directly the keys values
    //     return (
    //         // build images list
    //          -------------------
    //         it is recommended to use 'array.map' method for JSX instead of
    //         using 'for' loops.
        

    //         Sending to each video list item
    //         - src
    //         - video key (map iterator need it)
    //         - atl
    //         ------------------- 

    //         // rendering the image directly
    //         <img 
    //             src={urls.regular} 
    //             key={id}
    //             alt={alt_description}
    //         />

    //     );
    // });


    const   images = props.images.map((image) => { // taking directly the keys values
        return (
            // build images list
            <ImageCard 
                key={image.id}
                image={image}
            />
        );
    });

    return(
        <div className="image-list">
            {images}
        </div>
    );
};

export default ImageList; // ES6 exports the component