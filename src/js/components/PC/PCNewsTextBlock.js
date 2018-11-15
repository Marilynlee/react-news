import React from "react";
import {Card,Tooltip} from "antd";
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
                <li key={index}>
                    <Link to={`details/${item.uniquekey}`} target="_blank" data-id={item.uniquekey}>
                        <Tooltip placement="bottomLeft" title={item.title}>
                            {item.title}
                        </Tooltip>
                    </Link>
                </li>
            )
            :
            "客观稍等，暂时还没有新闻！";

        return (
            <div className="topNewsList">
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }

}