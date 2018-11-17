import React from "react";
import {Avatar, Button, Col, Divider, Form, Icon, Input, List, notification, Row} from "antd";
import "whatwg-fetch";


const FormItem = Form.Item;

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: ""
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.form.validateFields(["comment"], (err, values) => {
            if (!err) {
                console.log(values);
                fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=comment&userid=${localStorage.userId}&uniquekey=${this.props.uniquekey}&comment=${values.comment}`,
                    {method: 'GET'})
                    .then(response => response.json())
                    .then(json => {
                        this.componentDidMount();
                        this.props.form.resetFields(["comment"], "")
                    });

            }
        });
    }

    addUserCollection() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=uc&userid=${localStorage.userId}&uniquekey=${this.props.uniquekey}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                notification.success({
                    message: "React News提醒",
                    description: "收藏文章成功！"
                });
            });
    }

    componentDidMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&uniquekey=${this.props.uniquekey}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                this.setState({comments: json});
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 24},
            wrapperCol: {span: 24},
        };
        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        );

        const {comments} = this.state;
        const commentsList = comments.length ?
            <List
                size="small"
                dataSource={comments}
                // itemLayout="vertical "
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                renderItem={item => (
                    <List.Item
                        key={item.uniquekey}
                        actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                            <IconText type="message" text="2"/>]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src="./src/imgs/avatar.png"/>}
                            title={item.UserName}
                            description={<div><a>发布于{item.datetime}</a></div>}
                        />
                        {item.Comments}
                    </List.Item>

                )}
            />
            :
            "还没有用户进行评论，赶紧抢沙发吧！";

        return (
            <div className="comment">
                <Row>
                    <Col span={24}>
                        {commentsList}
                        <Divider />
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem {...formItemLayout} label="您的评论">
                                {getFieldDecorator('comment', {
                                    rules: [{required: true, message: '请输入内容!'}],
                                })(
                                    <Input type="textarea" placeholder="写点什么吧。。。"/>
                                )}
                            </FormItem>
                            <FormItem wrapperCol={{span: 24}}>
                                <Button type="primary" htmlType="submit">提交评论</Button>
                                <Button type="primary" style={{float:"right"}} htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏文章</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

}


export default Comments = Form.create()(Comments);