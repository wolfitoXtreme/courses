// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// components
import SongList from './song-list';
import SongDetail from './song-detail'; 


// logic
// --------------

// --


// components
// --------------
const App = () => {
    return(
        <div className="ui container grid">
            <div className="ui row">
                <div className="column eight wide">
                    <SongList />
                </div>
                <div className="column eight wide">
                    <SongDetail />
                </div>
            </div>
        </div>
    );
};

// export
export default App;