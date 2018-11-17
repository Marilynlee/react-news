import React from "react";
import {BackTop, Col, Row, Divider} from "antd";
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";
import Comments from "../common/Comments";


export default class MobileNewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItem: ""
        };
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
            <div id="mobileDetailsContainer">
                <MobileHeader/>
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <Divider/>
                            <Comments uniquekey={this.props.params.uniquekey}/>
                        </Col>
                    </Row>
                </div>
                <MobileFooter/>
                <BackTop />
            </div>
        )
    }

}