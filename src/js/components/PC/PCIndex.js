/**
 * Created by Dragon-PC on 2018/11/4/0004.
 */
import React from "react";
import PCHeader from './PCHeader';
import PCFooter from './PCFooter';
import PCNewsContainer from './PCNewsContainer';

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader/>
                <PCNewsContainer/>
                <PCFooter/>
            </div>
        )
    }
}

