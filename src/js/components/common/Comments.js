import React from "react";
import {Button, Col, Divider, Form, Input, List, Row, Avatar, message} from "antd";
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
                        this.props.form.resetFields(["comment"],"")
                    });

            } else {
                message.error("请输入有效信息!");
            }
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
        const {comments} = this.state;
        const commentsList = comments.length ?
            <List
                dataSource={comments}
                itemLayout="vertical "
                renderItem={item => (
                    <List.Item key={item.uniquekey}>
                        <List.Item.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={item.UserName}
                            description={item.Comments}
                        />
                        <div><a>发布于{item.datetime}</a></div>
                    </List.Item>
                )}
            />


            // comments.map((item, index)=>
            //     <Card key={index} title={item.UserName} extra={<a>发布于{item.datetime}</a>}>
            //         <p>{item.Comments}</p>
            //     </Card>
            // )
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
                            <FormItem wrapperCol={{span: 12, offset: 6}}>
                                <Button type="primary" htmlType="submit" className="login-form-button">提交评论</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }

}


export default Comments = Form.create()(Comments);