import React from 'react';
import {Row, Col} from 'antd';


export default class MobileFooter extends React.Component {
    render() {
        return (
            <footer>
                <Row>
                    <Col offset={2} span={20} className='footer'>
                        &copy;&nbsp;2018 ReactNews. All Rights Reserved.
                    </Col>
                </Row>
            </footer>
        )
    }

}