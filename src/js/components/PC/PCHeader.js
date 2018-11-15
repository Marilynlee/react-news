/**
 * Created by Dragon-PC on 2018/11/4/0004.
 */
import React from "react";
import {Button, Col, Form, Icon, Input, Menu, message, Modal, Row, Tabs} from "antd";
import {Link} from "react-router";
import "whatwg-fetch";


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

class PCHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: 'hot',
            modalShow: false,
            action: 'login',
            hasLogin: false,
            userNickName: "",
            userId: "",
        };
    }

    handleClick(e) {
        if(e.key==='register'){
            this.setState({modalShow:true})
        }
        this.setState({current: e.key});
    };

    handleModalShow(boolean) {
        this.setState({
            modalShow: boolean
        });
    };

    changeTab(key){
        if(key==="loginTab"){
            this.setState({action: 'login'});
        }else{
            this.setState({action: 'register'});
        }
    }

    loginOut(e){
        e.preventDefault();
        e.stopPropagation();
        localStorage.userid= '';
        localStorage.userNickName = '';
        this.setState({hasLogin:false,userId:"",userNickName:""});
    }

    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        if(this.state.action==="login"){
            this.props.form.validateFields(["userNameLogin","passwordLogin"],(err, values) => {
                if (!err) {
                    console.log(values);
                    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=login&r_username=${values.userName}&r_password=${values.password}`,
                        {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            localStorage.userId= json.UserId;
                            localStorage.userNickName = json.NickUserName;
                            this.setState({hasLogin:true,userNickName: json.NickUserName?json.NickUserName:"Lyn",userId: json.UserId,modalShow:false});
                            message.success("请求成功！",5);
                        });

                }else{
                    message.error("请输入有效信息!");
                }
            });
        }else if(this.state.action==="register"){
            this.props.form.validateFields(["userName","password","confirmPassword"],(err, values) => {
                if (!err) {
                    console.log(values);
                    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=${this.state.action}&r_username=${values.userName}&r_password=${values.password}&r_confirmPassword=${values.confirmPassword}`,
                        {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            this.setState({userNickName: json.NickUserName?json.NickUserName:"Lyn", userId: json.UserId,modalShow:false});
                            localStorage.userId= json.UserId;
                            localStorage.userNickName = json.NickUserName;
                            message.success("请求成功！",5);
                        });

                }else{
                    message.error("请输入有效信息!");
                }
            });
        }
    }
    componentWillMount(){
        console.log("will mount");
    }
    componentDidMount(){
        console.log("did mount");
    }
    componentDidUpdate(){
        console.log("did update");
    }


    render() {
        const userShow = this.state.hasLogin
            ?
            <Menu.Item key="logout">
                <ButtonGroup>
                    <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                    &nbsp;&nbsp;
                    {/*<Link>*/}
                        <Button type='dashed' htmlType="button">个人中心</Button>
                    {/*</Link>*/}
                    &nbsp;&nbsp;
                    {/*<Link>*/}
                        <Button type="ghost" htmlType="button" onClick={this.loginOut.bind(this)}>退出</Button>
                    {/*</Link>*/}
                </ButtonGroup>
            </Menu.Item>
            :
            <Menu.Item key="register">
                <Icon type="unlock" theme="outlined"/>注册/登录
            </Menu.Item>;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <header>
                <Row>
                    <Col offset={2} span={4}>
                        <a href="/" className="logo">
                            <img src="./src/imgs/logo.png" alt="logo"/>
                            <span>React News</span>
                        </a>
                    </Col>
                    <Col offset={2} span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
                            <Menu.Item key="hot"><Icon type="rocket" theme="outlined"/>头条</Menu.Item>
                            <Menu.Item key="sociology"><Icon type="codepen-circle" theme="outlined"/>社会</Menu.Item>
                            <Menu.Item key="home"><Icon type="dribbble" theme="outlined"/>国内</Menu.Item>
                            <Menu.Item key="international"><Icon type="global" theme="outlined"/>国际</Menu.Item>
                            <Menu.Item key="fun"><Icon type="message" theme="outlined"/>娱乐</Menu.Item>
                            <Menu.Item key="sport"><Icon type="notification" theme="outlined"/>体育</Menu.Item>
                            <Menu.Item key="tech"><Icon type="rocket" theme="outlined"/>科技</Menu.Item>
                            <Menu.Item key="fashion"><Icon type="skin" theme="outlined"/>时尚</Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <Modal destroyOnClose={true} title="用户中心" visible={this.state.modalShow} centered={true}
                           okText="关闭"  onCancel={this.handleModalShow.bind(this, false)} footer={null}>
                        <Tabs type="line"  onChange={this.changeTab.bind(this)}>
                            <TabPane tab="登录" key="loginTab">
                                <Form onSubmit={this.handleSubmit.bind(this)}>
                                    <FormItem {...formItemLayout} label="账户">
                                        {getFieldDecorator('userNameLogin', {
                                            rules: [{required: true, message: '请输入账户!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="账户"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="密码">
                                        {getFieldDecorator('passwordLogin', {
                                            rules: [{required: true, message: '请输入密码!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                                   placeholder="密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                            <TabPane tab="注册" key="registerTab">
                                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                    <FormItem {...formItemLayout} label="用户名">
                                        {getFieldDecorator('userName', {
                                            rules: [{required: true, message: '请输入用户名!'}],
                                        })(
                                            <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                   placeholder="用户名"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="密码">
                                        {getFieldDecorator('password', {
                                            rules: [{required: true, message: '请输入密码!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                                   placeholder="密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem {...formItemLayout} label="确认密码">
                                        {getFieldDecorator('confirmPassword', {
                                            rules: [{required: true, message: '请确认密码!'}],
                                        })(
                                            <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                                   placeholder="确认密码"/>
                                        )}
                                    </FormItem>
                                    <FormItem wrapperCol={{ span: 12, offset: 6 }}>
                                        <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                                    </FormItem>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Modal>
                </Row>
            </header>
        )
    }
}

export default PCHeader = Form.create()(PCHeader);