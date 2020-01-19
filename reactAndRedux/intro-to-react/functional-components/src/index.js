// 
// App
// 

// dependencies
// --------------

// npm modules
import React from 'react';
import reactDOM from 'react-dom';
import faker from 'faker';          // fake data to use during development

// app components
import CommentDetail from './comment-detail';
import ApprovalCard from './approval-card';      // approval card

// App
// --------------

// component
const App = () => {

    return (
        <div className="ui container comments">

            <ApprovalCard> 
                <div>
                    <h4>Warning!!</h4>
                    Are you sure you want to do this?
                </div>
            </ApprovalCard>

            {/*
                passing a component "CommentDetail" as a property 
                to another component "ApprovalCard"
            */}
            <ApprovalCard>       
                <CommentDetail
                    avatar={faker.image.avatar()}
                    author="Jonh Doe"
                    timeAgo="today ad 4:45PM"
                    post="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                />
            </ApprovalCard>

            <ApprovalCard>
                <CommentDetail
                    avatar={faker.image.avatar()}
                    author="Jane Doe"
                    timeAgo="today ad 2:00AM"
                    post="Saepe alias nam architecto iure, sapiente accusantium expedita."
                />
            </ApprovalCard>
            
            <ApprovalCard>
                <CommentDetail 
                    avatar={faker.image.avatar()}
                    author="Richard  Doe"
                    timeAgo="today ad 12:12PM"
                    post="Maxime beatae deserunt ducimus fugit pariatur, cum molestias provident!"
                />
            </ApprovalCard>
        </div>
    );
};

// render components
reactDOM.render(
    <App />,
    document.querySelector('#root')
);