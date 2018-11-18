import React from "react";
import {Col, Icon, List, message, Row, Tabs, Upload} from "antd";
import PCHeader from "./PCHeader";
import PCFooter from "./PCFooter";
import {Link} from "react-router";
import "whatwg-fetch";


const TabPane = Tabs.TabPane;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJPG) {
        message.error('只能上传jpg或者png格式图片！');
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
        message.error('图片大小不能超过1M！');
    }
    return isJPG && isLt1M;
}


class PCUserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.state ? this.props.location.state : 'top',
            modalShow: false,
            loading: false,
            userCollection: '',
            userComments: '',
        };
    }

    changeNewsType(e) {
        if (e.key === 'register') {
            this.setState({modalShow: true});
        } else {
            this.setState({type: e.key, modalShow: false});
        }

    }

    handleChange(info) {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    componentDidMount() {
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userId,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                this.setState({userCollection: json});
            });

        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getcomments&userid=" + localStorage.userId,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                this.setState({userComments: json});
            });

    };


    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        const {userCollection, userComments} = this.state;
        const userCollectionList = userCollection.length ?
            <List size="small" dataSource={userCollection}  bordered
                  pagination={{
                      onChange: (page) => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  renderItem={item => (
                      <List.Item key={item.uniquekey} actions={[<Link to={`details/${item.uniquekey}`}>查看</Link>]}>
                          {item.Title}
                      </List.Item>
                  )}
            />
            :
            '您还没有收藏任何的新闻，快去收藏一些新闻吧。';

        const userCommentsList = userComments.length ?
            <List size="small" dataSource={userComments}  bordered
                  pagination={{
                      onChange: (page) => {
                          console.log(page);
                      },
                      pageSize: 10,
                  }}
                  renderItem={item => (
                      <List.Item key={item.Id.Pid} actions={[<Link to={`details/${item.uniquekey}`}>查看</Link>]}>
                          <List.Item.Meta description={<div>于{item.datetime}评论了{item.uniquekey}文章</div>}/>
                          {item.Comments}
                      </List.Item>
                  )}
            />
            :
            '您还没有发表过任何评论。';


        return (
            <div>
                <PCHeader modalShowProps={this.state.modalShow} changeNewsType={this.changeNewsType.bind(this)}/>
                <Row>
                    <Col offset={2} span={20}>
                        <Tabs>
                            <TabPane tab="收藏列表" key="1">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {userCollectionList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="评论列表" key="2">
                                <div className="comment">
                                    <Row>
                                        <Col span={24}>
                                            {userCommentsList}
                                        </Col>
                                    </Row>
                                </div>
                            </TabPane>
                            <TabPane tab="头像设置" key="3">
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="//jsonplaceholder.typicode.com/posts/"
                                    beforeUpload={beforeUpload}
                                    onChange={this.handleChange.bind(this)}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar"/> : uploadButton}
                                </Upload>
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
                <PCFooter/>
            </div>
        )
    }

}


export default PCUserCenter;

