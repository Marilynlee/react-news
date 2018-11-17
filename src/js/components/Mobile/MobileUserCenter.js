import React from 'react';
import {Button, Col, Form, Icon, Input, Menu, message, Modal, Row, Tabs} from "antd";
import MobileHeader from './MobileHeader';
import MobileFooter from './MobileFooter';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;


export default class MobileUserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.state?this.props.location.state:'top',
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
                <MobileHeader/>
                <Row>
                    <Col span={24}>
                        <Tabs>
                            <TabPane tab="我的收藏列表" key="1">
                                <div>123</div>
                            </TabPane>
                            <TabPane tab="我的评论列表" key="2">
                                <div>456</div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <div>789</div>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <MobileFooter/>
            </div>
        )
    }

}