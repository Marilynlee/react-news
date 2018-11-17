import React from "react";
import {Card, List, Tooltip} from "antd";
import {BrowserHistory, Link} from "react-router";

export default class PCNewsTextBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: ""
        };
    }

    getNewsList(type, count) {
        fetch(`http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`,
            {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                // console.info(json);
                this.setState({news: json});
            });
    }


    componentWillMount() {
        this.getNewsList(this.props.type, this.props.count);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.type !== this.props.type) {
            this.getNewsList(nextProps.type, nextProps.count);
        }
    }

    render() {
        const itemType = this.props.type;
        const {news} = this.state;
        const newsList = news.length ?
            <List
                dataSource={news}
                itemLayout="vertical "
                pagination={{
                    onChange: (page) => {
                        this.getNewsList(this.props.type, this.props.count*page);
                    },
                    pageSize: 16,
                }}
                renderItem={item => (
                    <Link to={{
                        pathname: `details/${item.uniquekey}`,
                        state: `${itemType}`
                    }}>
                        <Tooltip placement="bottomLeft" title={item.title}>
                            <List.Item>
                                <p>{item.title}</p>
                            </List.Item>
                        </Tooltip>
                    </Link>
                )}
            />
            :
            "客观稍等，暂时还没有新闻！";

        return (

            <div className="topNewsList">
                <Card>
                    {newsList}
                </Card>
            </div>
        )
    }

}