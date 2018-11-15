import React from "react";
import MobileHeader from "./MobileHeader";
import MobileFooter from "./MobileFooter";
import MobileList from "./MobileList";


import {Carousel, Col, Row, Tabs} from "antd";
import "whatwg-fetch";


const TabPane = Tabs.TabPane;

export default class MobileIndex extends React.Component {

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
                <MobileHeader/>
                <Tabs>
                    <TabPane tab="头条" key="hot">
                        <div className="carousel">
                            <Carousel {...setting}>
                                { carouselItem }
                            </Carousel>
                        </div>
                        <MobileList count={20} type="top"/>
                    </TabPane>
                    <TabPane tab="社会" key="sociology">
                        <MobileList count={20} type="shehui"/>
                    </TabPane>
                    <TabPane tab="国内" key="home">
                        <MobileList count={20} type="guonei"/>
                    </TabPane>
                    <TabPane tab="国际" key="international">
                        <MobileList count={20} type="guoji"/>
                    </TabPane>
                    <TabPane tab="娱乐" key="fun">
                        <MobileList count={20} type="yule"/>
                    </TabPane>
                    <TabPane tab="体育" key="sport">
                        <MobileList count={20} type="tiyu"/>
                    </TabPane>
                    <TabPane tab="科技" key="tech">
                        <MobileList count={20} type="keji"/>
                    </TabPane>
                    <TabPane tab="时尚" key="fashion">
                        <MobileList count={20} type="shishang"/>
                    </TabPane>
                </Tabs>
                <MobileFooter/>
            </div>
        )
    }

}