// 
// App
// 

// dependencies
// --------------
// npm modules
import React from 'react';


//components
import SearchBar from './search-bar';       // search bar
import VideoList from './video-list';       // video list
import VideoDetail from './video-detail';    // video detail
import Youtube from '../apis/youtube';      // youtube configuration

// 

// logic
// --------------

//

// components
// --------------
class App extends React.Component {
    // constructor method
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    // componentDidMount method
    componentDidMount() {
        this.onTermSubmit('cat'); // setting default search term
    }

    // onTermSubmit custom function
    onTermSubmit = async (term) => {    // this will be an asynchronous request
        console.log('term = ' + term);

        // Axios instance 
        const response = await Youtube.get('/search', {    // url
                params: {           // extra query parameters
                    q: term
                }
        }); // will wait till request is don and data is accessible

        console.log(response);

        // update state
        this.setState({
            videos: response.data.items,
            selectedVideo: response.data.items[0] // first video
        });
    };

    // onVideoSelect custom function
    onVideoSelect = (video) => {
        console.log('From the App!', video);
        this.setState({selectedVideo: video});
    };

    // render method
    render(){
        return(
            <div className="ui container">
                <SearchBar 
                    onFormSubmit={this.onTermSubmit}
                />
                <p>{this.state.videos.length} videos retrieved</p>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail 
                                video={this.state.selectedVideo}
                            />
                        </div>
                        <div className="five wide column">
                            <VideoList 
                                videos={this.state.videos}
                                onVideoSelection={this.onVideoSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// export
export default App;