// 
// unsplash
// 

// dependencies
// --------------

// npm modules
import axios from 'axios';  // to handle Ajax requests though Axios (Promise based HTTP client) instead of using fetch native browser method

// logic
// --------------

// axios configuration
export default axios.create({
    headers: {
        Authorization: 'Client-ID 3b2cc5839cc3353062772cb5e2cd4230fa08a865c917ed0dffb8ac768d5f1439'
    },
    baseURL: 'https://api.unsplash.com'
});