import React from "react";
import {Col, Row} from "antd";
import PCHeader from './PCHeader';
import PCFooter from './PCFooter';

export default class PCNewsDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsItem: ""
        };
    }

    componentDidMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${this.props.params.uniquekey}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                // console.info(json);
                this.setState({newsItem: json});
                document.title = this.state.newsItem.title + " - React News | React 新闻平台 ";
            });
    }

    createMarkup() {
        return {__html: this.state.newsItem.pagecontent}
    }

    render() {
        return (
            <div>
                <PCHeader/>
                <Row>
                    <Col offset={2} span={14} className="container">
                        <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                    </Col>
                </Row>
                <PCFooter/>
            </div>
        )
    }

}