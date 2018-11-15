import React from "react";
import ReactDOM from "react-dom";
import MediaQuery from 'react-responsive';
import {Router, Route, hashHistory,BrowserHistory, Link} from "react-router";


import PCIndex from './components/PC/PCIndex';
import PCNewsDetails from './components/PC/PCNewsDetails';

import MobileIndex from './components/Mobile/MobileIndex';

import '../css/pc.css';
import '../css/mobile.css';

class Root extends React.Component {
    constructor(){
        super();
    }

    render() {
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}/>
                        <Route path="details/:uniquekey" component={PCNewsDetails}/>
                    </Router>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    <MobileIndex/>
                </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('app')
);
