/**
 * Created by Dragon-PC on 2018/11/4/0004.
 */
import React from "react";
import PCHeader from './PCHeader';
import PCFooter from './PCFooter';
import PCNewsContainer from './PCNewsContainer';

export default class PCIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'top',
            modalShow:false
        };
    }

    changeNewsType(e){
        if(e.key==='register'){
            this.setState({modalShow:true});
        }else {
            this.setState({type: e.key,modalShow:false});
        }

    }

    render() {
        return (
            <div>
                <PCHeader modalShow={this.state.modalShow} type={this.state.type} changeNewsType={this.changeNewsType.bind(this)}/>
                <PCNewsContainer type={this.state.type}/>
                <PCFooter/>
            </div>
        )
    }
}

