import React from "react";
import {Row,Col} from "antd";
import {BrowserHistory, Link} from "react-router";

export default class PCNewsTextBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: ""
        };
    }


    componentWillMount() {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${this.props.type}&count=${this.props.count}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                // console.info(json);
                this.setState({news: json});
            });
    }

    render() {

        const {news} = this.state;
        const newsList = news.length ?
            news.map((item, index) =>
                <section key={index} className="m_article list-item special_section clearfix">
                    <Link to={`details/${item.uniqueKey}`}>
                        <div className="m_article_img">
                            <img src={item.thumbnail_pic_s} alt={item.title}/>
                        </div>
                        <div className="m_article_info">
                            <div className="m_article_title">
                                <span>{item.title}</span>
                            </div>
                            <div className="m_article_desc">
                                <div className="m_article_desc_l">
                                    <span className="m_article_channel">{item.realtype}</span>
                                    <span className="m_article_time">{item.date}</span>
                                </div>
                            </div>
                        </div>

                    </Link>
                </section>
            )
            :
            <div className="no-response">客观稍等，暂时还没有新闻！</div>;

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {newsList}
                    </Col>
                </Row>
            </div>
        )
    }

}