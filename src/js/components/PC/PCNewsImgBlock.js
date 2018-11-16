import React from "react";
import {Card, Tooltip} from "antd";
import {BrowserHistory, Link} from "react-router";

export default class PCNewsImgBlock extends React.Component {
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

        const styleImage = {
            display: "block",
            width: "95%"

        };
        const styleH3 = {
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        };
        const itemType = this.props.type;
        const {news} = this.state;
        const newsList = news.length ?
            news.map((item, index) =>
                <div key={index} className="imageblock" style={{width: this.props.imageWidth, verticalAlign: "top"}}>
                    {/*<Link to={`details/${item.uniquekey}`}  state={{type: itemType}} target="_blank">*/}
                    <Link to={{
                        pathname: `details/${item.uniquekey}`,
                        state: `${itemType}`
                    }} >
                        <div className="custom-image">
                            <img src={item.thumbnail_pic_s} alt="news picture" style={styleImage}/>
                        </div>
                        <div className="custom-card">
                            <Tooltip placement="bottomLeft" title={item.title}>
                                <h3 style={styleH3}>{item.title}</h3>
                            </Tooltip>
                            <p>{item.author_name}</p>
                        </div>
                    </Link>
                </div>
            )
            :
            "客观稍等，暂时还没有新闻！";

        return (
            <div className="topNewsList">
                <Card title={this.props.cartTitle} bordered={true} style={{width: this.props.width}}>
                    {newsList}
                </Card>
            </div>
        )
    }

}