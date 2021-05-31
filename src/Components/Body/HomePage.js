import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Body.css'
import App from '../../App';
//Going through and settig up our title component with multiple items
function HomeBody() {
    return (
        <Container fluid className="bodyBG removeAllSpacing">
            <Row>
                <Col xs={12} className="d-flex justify-content-center removeAllSpacing">
                    <h1 className="white mr-2 mt-4">A one stop Weather App Shop!</h1>
                </Col>
                <Col xs={12} className="d-flex justify-content-center removeAllSpacing">
                    <h1 className="white mt-4">Start searching to find any place's geographical weather!</h1>
                </Col>
            </Row>
        </Container>
    )
}
export default HomeBody;