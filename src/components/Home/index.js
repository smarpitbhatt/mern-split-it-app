import React from 'react';
import './index.css';

import Dashboard from '../Dashboard';
import LeftPanel from '../LeftPanel';

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            User:{}
        }

    }

    render() {
        return (
            <div>
                <header id="main-header" className="py-2 bg-primary text-white shadow-sm p-3  rounded">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                            <h1>Dashboard</h1> 
                            </div>
                        </div>
                    </div>
                </header>

                {/* DASHBOARD */}

                <div className="row ">
                    
                    {/* Left Panel */}

                    <div className="w-25 leftpanel">
                        <LeftPanel user={this.props.User}/>
                    </div>

                    <div className="shadow p-3 w-50 rounded dashboard"><Dashboard user={this.props.user} /></div>
                    
                    {/* Right Panel */}

                    <div className="w-25"></div>
                    
                </div>

                
            </div>
        )
    }
}