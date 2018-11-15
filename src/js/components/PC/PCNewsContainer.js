import React from "react";
import {Carousel, Col, Row, Tabs, Card} from "antd";
import PCNewsTextBlock from "./PCNewsTextBlock";
import PCNewsImgBlock from "./PCNewsImgBlock";

const TabPane = Tabs.TabPane;
const { Meta } = Card;


export default class PCNewsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            // type:this.props.type
        }
    }

    render() {

        const setting = {
            autoplay: true,
        };

        const carouselItem = [1, 2, 3, 4, 5, 6, 7].map((item) =>
            <div key={item}>
                <img src={`./src/imgs/carousel_${item}.jpg`} alt="image"/>
            </div>
        );
        return (
            <div>
                <Row>
                    <Col offset={2} span={20} className="container">
                        <Row  type="flex" justify="space-around">
                            <Col span={8}>
                                <div className="carousel">
                                    <Carousel {...setting}>
                                        { carouselItem }
                                    </Carousel>
                                </div>
                                <PCNewsImgBlock count={6} type="yule" width="100%" cartTitle="娱乐头条" imageWidth="33%"/>
                            </Col>
                            <Col span={10}>
                                <PCNewsTextBlock count={20} type={this.props.type}/>
                            </Col>
                            <Col span={4}>
                                <Card hoverable style={{ width: "100%" }} cover={<img alt="example" src="./src/imgs/carousel_1.jpg"/>}>
                                    <Meta title="Advertised" description="www.instagram.com"/>
                                </Card>
                                <Card hoverable style={{ width: "100%" }} cover={<img alt="example" src="./src/imgs/carousel_2.jpg"/>}>
                                    <Meta title="Advertised" description="www.instagram.com"/>
                                </Card>
                                <Card hoverable style={{ width: "100%" }} cover={<img alt="example" src="./src/imgs/carousel_3.jpg"/>}>
                                    <Meta title="Advertised" description="www.instagram.com"/>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <PCNewsImgBlock count={10} type="keji" width="100%" cartTitle="科技头条" imageWidth="10%"/>
                                <PCNewsImgBlock count={10} type="shishang" width="100%" cartTitle="时尚头条" imageWidth="10%"/>
                                <PCNewsImgBlock count={10} type="tiyu" width="100%" cartTitle="体育头条" imageWidth="10%"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

}