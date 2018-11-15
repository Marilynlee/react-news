import React from "react";
import {Col, Row, BackTop} from "antd";
import PCHeader from "./PCHeader";
import PCFooter from "./PCFooter";
import PCNewsImgBlock from "./PCNewsImgBlock";

export default class PCNewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItem: ""
        };
    }

    getNewsItemDetail(uniquekey){
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

    componentWillReceiveProps(nextProps){
        if (nextProps.params.uniquekey !== this.props.params.uniquekey) {
            let uniquekey = nextProps.params.uniquekey;
            this.getNewsItemDetail(uniquekey);
        }
    }

    createMarkup() {
        let newsItem = this.state.newsItem?this.state.newsItem.pagecontent:"";
        return {__html: newsItem}
    }

    render() {
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col offset={2} span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                    <Col span={6}>
                        <PCNewsImgBlock count={20} type={this.props.location.state} cartTitle="相关新闻" width="100%" imageWidth="50%" />
                    </Col>
                </Row>
                <PCFooter/>
                <BackTop />
            </div>
        )
    }

}