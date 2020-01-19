// 
// Posts list
// 

// dependencies
// --------------

// npm modules
import React, { Component } from 'react'; // 'default' and 'named' import
import {connect} from 'react-redux';

//components
import {fetchPosts} from '../actions';  // Action creator 'fetchPosts' to pass to Redux
                                        // via connect, imported {named} module
// logic
// --------------

// state
/*-------------------
will return the 'state' as 'props' coming from 'reducers' included in App, 'reducers'
-------------------*/
const mapStateToProps = (state) => { // convention naming, gets state
    console.log('PostList Component mapStateToProps =>', state);

    // outputs the state
    return {
        posts: state.posts
    };
};


// components
// --------------

// posts list
class PostList extends Component {

    // componentDidMount method
    componentDidMount() {
        this.props.fetchPosts(); // setting default posts
    }

    // render list custom helper method
    renderList() {
        return this.props.posts.map((post) => { // return a JSX full result
            return(                             // returns one piece of JSX for each iteration
                <div className="item" key={post.id}>
                    <i className="large middle aligned icon user"></i>
                    <div className="content">
                        <div className="description">
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                    </div>
                </div>
            );
        });
    }

    // render method
    render() {
       console.log('PostList component => ', this.props.posts);
       
       return(
           <div className="ui relaxed divided list">{this.renderList()}</div>
       );
    }
}

// export
export default connect(
    // pass all the APP state props to the current component 'PostList'
    // null, // no state needed
    mapStateToProps,

    /*-------------------
    Actions to perform
    action creator passed to update the Redux store, will execute
    store.dispatch(selectSong('the selected song')); via the connect function
    see 'basic-concepts' example
    -------------------*/
    { fetchPosts }
)(PostList); // connect the component