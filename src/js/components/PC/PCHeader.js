/**
 * Created by Dragon-PC on 2018/11/4/0004.
 */
import React from "react";
import {Button, Col, Form, Icon, Input, Menu, message, Modal, Row, Tabs} from "antd";
import {Link} from "react-router";


const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;


const LoginAndRegisterForm = Form.create()(
    class extends React.Component {
        render() {
            const {modalShow, handleModalShow, changeTab, handleSubmit, form} = this.props;
            const {getFieldDecorator} = form;
            const formItemLayout = {
                labelCol: {span: 6},
                wrapperCol: {span: 14},
            };

            return (
                <Modal destroyOnClose={true} title="用户中心" visible={modalShow} centered={true}
                       okText="关闭" onCancel={() => handleModalShow(false)} footer={null}>
                    <Tabs type="line" onChange={changeTab}>
                        <TabPane tab="登录" key="loginTab">
                            <Form onSubmit={handleSubmit} className="loginBox">
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
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="密码"/>
                                    )}
                                </FormItem>
                                <FormItem wrapperCol={{span: 12, offset: 6}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="registerTab">
                            <Form onSubmit={handleSubmit} className="registerBox">
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
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="密码"/>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="确认密码">
                                    {getFieldDecorator('confirmPassword', {
                                        rules: [{required: true, message: '请确认密码!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="确认密码"/>
                                    )}
                                </FormItem>
                                <FormItem wrapperCol={{span: 12, offset: 6}}>
                                    <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            );
        }
    }
);


class PCHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: this.props.modalShowProps,
            action: 'login',
            hasLogin: false,
            userNickName: "",
            userId: "",
        };
        this.handleModalShow = this.handleModalShow.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.saveFormRef = this.saveFormRef.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalShowProps !== this.props.modalShowProps) {
            this.setState({modalShow: nextProps.modalShowProps});
        }
        if (nextProps.modalShowProps && !this.state.modalShow) {
            this.setState({modalShow: true});
        }
    }

    handleModalShow(boolean) {
        this.setState({
            modalShow: boolean
        });
    };

    changeTab(key) {
        if (key === "loginTab") {
            this.setState({action: 'login'});
        } else {
            this.setState({action: 'register'});
        }
    };

    loginOut(e) {
        e.preventDefault();
        e.stopPropagation();
        localStorage.userid = '';
        localStorage.userNickName = '';
        this.setState({hasLogin: false, userId: "", userNickName: ""});
    };

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const form = this.formRef.props.form;
        if (this.state.action === "login") {
            form.validateFields(["userNameLogin", "passwordLogin"], (err, values) => {
                if (!err) {
                    console.log(values);
                    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=login&r_username=${values.userName}&r_password=${values.password}`,
                        {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            localStorage.userId = json.UserId;
                            localStorage.userNickName = json.NickUserName? json.NickUserName : "Lyn";
                            this.setState({
                                hasLogin: true,
                                userNickName: json.NickUserName ? json.NickUserName : "Lyn",
                                userId: json.UserId,
                                modalShow: false
                            });
                            message.success("登录成功！", 5);
                            form.resetFields();
                        });

                } else {
                    message.error("请输入有效信息!");
                }
            });
        } else if (this.state.action === "register") {
            form.validateFields(["userName", "password", "confirmPassword"], (err, values) => {
                if (!err) {
                    console.log(values);
                    fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=${this.state.action}&r_username=${values.userName}&r_password=${values.password}&r_confirmPassword=${values.confirmPassword}`,
                        {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            this.setState({
                                userNickName: json.NickUserName ? json.NickUserName : "Lyn",
                                userId: json.UserId,
                                modalShow: false
                            });
                            localStorage.userId = json.UserId;
                            localStorage.userNickName = json.NickUserName? json.NickUserName : "Lyn";
                            message.success("注册成功！", 5);
                            form.resetFields();
                        });

                } else {
                    message.error("请输入有效信息!");
                }
            });
        }
    };

    saveFormRef(formRef) {
        this.formRef = formRef;
    };

    render() {
        const userShow = this.state.hasLogin
            ?
            <Menu.Item key="logout">
                <ButtonGroup>
                    <Button type="primary" htmlType="button">{this.state.userNickName}</Button>
                    &nbsp;&nbsp;
                    <Link to="/usercenter">
                        <Button type='dashed' htmlType="button">个人中心</Button>
                    </Link>
                    &nbsp;&nbsp;
                    <Button type="ghost" htmlType="button" onClick={this.loginOut.bind(this)}>退出</Button>
                </ButtonGroup>
            </Menu.Item>
            :
            <Menu.Item key="register">
                <Icon type="unlock" theme="outlined"/>注册/登录
            </Menu.Item>;

        return (
            <header>
                <Row>
                    <Col offset={2} span={4}>
                        <a href="/" className="logo">
                            <img src="./src/imgs/logo.png" alt="logo"/>
                            <span>React News</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu mode="horizontal" selectedKeys={[this.props.type]} onClick={this.props.changeNewsType}>
                            <Menu.Item key="top"><Icon type="rocket" theme="outlined"/>头条</Menu.Item>
                            <Menu.Item key="shehui"><Icon type="codepen-circle" theme="outlined"/>社会</Menu.Item>
                            <Menu.Item key="guonei"><Icon type="dribbble" theme="outlined"/>国内</Menu.Item>
                            <Menu.Item key="guoji"><Icon type="global" theme="outlined"/>国际</Menu.Item>
                            <Menu.Item key="yule"><Icon type="message" theme="outlined"/>娱乐</Menu.Item>
                            <Menu.Item key="tiyu"><Icon type="notification" theme="outlined"/>体育</Menu.Item>
                            <Menu.Item key="keji"><Icon type="rocket" theme="outlined"/>科技</Menu.Item>
                            <Menu.Item key="shishang"><Icon type="skin" theme="outlined"/>时尚</Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <LoginAndRegisterForm
                        wrappedComponentRef={this.saveFormRef}
                        modalShow={this.state.modalShow}
                        changeTab={this.changeTab}
                        handleModalShow={this.handleModalShow}
                        handleSubmit={this.handleSubmit}
                    />
                </Row>
            </header>
        )
    }
}

export default PCHeader;