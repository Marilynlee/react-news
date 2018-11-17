import React from "react";
import ReactDOM from "react-dom";
import MediaQuery from "react-responsive";
import {BrowserHistory, hashHistory, Route, Router} from "react-router";


import PCIndex from "./components/PC/PCIndex";
import PCNewsDetails from "./components/PC/PCNewsDetails";
import PCUserCenter from "./components/PC/PCUserCenter";

import MobileIndex from "./components/Mobile/MobileIndex";
import MobileNewsDetails from "./components/Mobile/MobileNewsDetails";
import MobileUserCenter from "./components/Mobile/MobileUserCenter";

import "../css/pc.css";
import "../css/mobile.css";

class Root extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <MediaQuery minDeviceWidth={1224}>
                    <Router history={hashHistory}>
                        <Route path="/" component={PCIndex}/>
                        <Route path="details/:uniquekey" component={PCNewsDetails}/>
                        <Route path="usercenter" component={PCUserCenter}/>
                    </Router>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={1224}>
                    <Router history={hashHistory}>
                        <Route path="/" component={MobileIndex}/>
                        <Route path="details/:uniquekey" component={MobileNewsDetails}/>
                        <Route path="usercenter" component={MobileUserCenter}/>
                    </Router>
                </MediaQuery>
            </div>
        )
    }
}

ReactDOM.render(
    <Root/>,
    document.getElementById('app')
);
