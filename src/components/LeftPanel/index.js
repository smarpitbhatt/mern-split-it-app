import React from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class LeftPanel extends React.Component {
    render() {
        return (
         <div className="leftpanel flex-column  shadow-sm p-3 mb-5 bg-white rounded  d-flex justify-content-center">


            <Link className="btn btn-secondary" to="#">Recent Activity</Link>
            <hr />
            <Link className="btn btn-secondary" to="#">Payment History</Link>
            <hr />
            <Link className="btn btn-secondary" to="#">Friends</Link>
            <hr />

         </div>

        )
    }
}