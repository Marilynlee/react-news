import React from "react";
import {BackTop, Col, Row, Divider } from "antd";
import PCHeader from "./PCHeader";
import PCFooter from "./PCFooter";
import PCNewsImgBlock from "./PCNewsImgBlock";
import Comments from "../common/Comments";
import {BrowserHistory, hashHistory} from "react-router";

export default class PCNewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.location.state,
            modalShow: false,
            newsItem: ""
        };
    }

    changeNewsType(e) {
        if (e.key === 'register') {
            this.setState({modalShow: true});
        } else {
            hashHistory.push({
                pathname: '/',
                state: e.key,
            })
        }

    }

    getNewsItemDetail(uniquekey) {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                // console.info(json);
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + " - React News | React 新闻平台 ";
            });
    }

    componentDidMount() {
        this.getNewsItemDetail(this.props.params.uniquekey);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.uniquekey !== this.props.params.uniquekey) {
            let uniquekey = nextProps.params.uniquekey;
            this.getNewsItemDetail(uniquekey);
        }
    }

    createMarkup() {
        let newsItem = this.state.newsItem ? this.state.newsItem.pagecontent : "";
        return {__html: newsItem}
    }

    render() {
        return (
            <div>
                <PCHeader modalShowProps={this.state.modalShow} type={this.state.type}
                          changeNewsType={this.changeNewsType.bind(this)}/>
                <Row>
                    <Col offset={2} span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                        <Divider />
                        <Comments uniquekey={this.props.params.uniquekey}/>
                    </Col>
                    <Col span={6}>
                        <PCNewsImgBlock count={20} type={this.props.location.state} cartTitle="相关新闻" width="100%"
                                        imageWidth="50%"/>
                    </Col>
                </Row>
                <PCFooter/>
                <BackTop />
            </div>
        )
    }

}