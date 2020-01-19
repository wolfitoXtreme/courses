// 
// Approval card
// 

// dependencies
// --------------

// npm modules
import React from 'react';

// components

// Approval Card
const ApprovalCard = (props) => {


    return (
        <div className="ui card">
            <div className="content">{props.children}</div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div className="ui basic green button">Approve</div>
                    <div className="ui basic red button">reject</div>
                </div>
            </div>
        </div>
    );
};

export default ApprovalCard; // ES6 exports the component