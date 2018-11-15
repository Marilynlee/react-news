import React from 'react';
import {
    Button,
    Col,
    Form,
    Icon,
    Input,
    Menu,
    Modal,
    Row,
    message,
    Tabs
} from "antd";
import {Link} from "react-router";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class MobileHeader extends React.Component {
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

    changeTab(key){
        if(key==="loginTab"){
            this.setState({action: 'login'});
        }else{
            this.setState({action: 'register'});
        }
    }

    handleModalShow(boolean) {
        this.setState({
            modalShow: boolean
        });
    };

    loginOut(){
        localStorage.userid= '';
        localStorage.userNickName = '';
        this.setState({hasLogin:false});
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
                            this.setState({userNickName: json.NickUserName?json.NickUserName:"Lyn", userId: json.UserId,modalShow:false,hasLogin:true});
                            localStorage.userId= json.UserId;
                            localStorage.userNickName = json.NickUserName;
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

    render() {

        const userShow = this.state.hasLogin
            ?
            <Icon type="user" theme="outlined" onClick={this.loginOut.bind(this)} />
            :
            <Icon type="lock" theme="outlined" onClick={this.handleModalShow.bind(this,true)} />;
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };

        return (
            <div className="m-header">
                <header>
                    <img src="./src/imgs/logo.png" alt="logo"/>
                    <span>React News</span>
                    {userShow}
                </header>
                <Modal  destroyOnClose={true} title="用户中心" visible={this.state.modalShow} centered={true}
                       okText="关闭"  onCancel={this.handleModalShow.bind(this, false)} footer={null}>
                    <Tabs type="line" onChange={this.changeTab.bind(this)}>
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
            </div>
        )
    }

}

export default MobileHeader = Form.create()(MobileHeader);