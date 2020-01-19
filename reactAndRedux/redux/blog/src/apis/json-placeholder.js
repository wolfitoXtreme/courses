// 
// JSON placeholder - https://jsonplaceholder.typicode.com/
// 

// dependencies
// --------------

// npm modules
import axios from 'axios';  // to handle Ajax requests though Axios (Promise based HTTP client) 
                            // instead of using fetch native browser method

// configuration
// --------------

// export
// pre-configured instance of Axios containing URL and default parameters
export default axios.create({
    params: {

    },
    baseURL: 'https://jsonplaceholder.typicode.com'
});