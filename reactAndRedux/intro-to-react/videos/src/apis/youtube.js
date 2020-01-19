// 
// youtube
// 

// dependencies
// --------------

// npm modules
import axios from 'axios';  // to handle Ajax requests though Axios (Promise based HTTP client) instead of using fetch native browser method

// configuration
// --------------
const   KEY = 'AIzaSyAad996cahI0NVYxrb6F8AOvBpfWS0z11M';

// export
// pre-configured instance of Axios containing URL and default parameters
export default axios.create({
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    },
    baseURL: 'https://www.googleapis.com/youtube/v3'
});